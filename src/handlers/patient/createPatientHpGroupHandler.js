import {
  CatRisk,
  PatientPulmonaryHypertensionGroup,
} from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment-timezone";

const createPatientHpGroupHandler = async ({
  patientId,
  hpGroupIds,
  transaction,
}) => {
  try {
    const validHpGroups = await CatRisk.findAll({
      where: { category: "HTP" },
      attributes: ["id"],
    });

    const validHpGroupIds = validHpGroups.map((group) => group.id);

    const invalidIds = hpGroupIds.filter((id) => !validHpGroupIds.includes(id));

    if (invalidIds.length > 0) {
      throw new Error(
        `Los siguientes IDs de grupos no son válidos para la categoría HTP: ${invalidIds.join(
          ", "
        )}`
      );
    }
    const existingGroups = await PatientPulmonaryHypertensionGroup.findAll({
      where: { patient: patientId },
      attributes: ["group"],
      transaction,
    });

    const existingGroupIds = existingGroups.map((group) => group.group);

    const groupsToDelete = existingGroupIds.filter(
      (id) => !hpGroupIds.includes(id)
    );
    const groupsToCreate = hpGroupIds.filter(
      (id) => !existingGroupIds.includes(id)
    );

    if (groupsToDelete.length > 0) {
      await PatientPulmonaryHypertensionGroup.destroy({
        where: {
          patient: patientId,
          group: groupsToDelete,
        },
        transaction,
      });
    }

    if (groupsToCreate.length > 0) {
      const newGroups = groupsToCreate.map((groupId) => ({
        patient: patientId,
        group: groupId,
        physician: contextService.get("request:user").userId,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      }));

      await PatientPulmonaryHypertensionGroup.bulkCreate(newGroups, {
        transaction,
      });
    }

    return true;
  } catch (error) {
    throw new Error(
      "Hubo un error durante el proceso de actualización de grupos de hipertensión pulmonar: " +
        error.message
    );
  }
};

export default createPatientHpGroupHandler;
