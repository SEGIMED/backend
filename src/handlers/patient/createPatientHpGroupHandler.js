import { PatientPulmonaryHypertensionGroup } from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment-timezone";

const createPatientHpGroupHandler = async ({
  patientId,
  hpGroupIds,
  transaction,
}) => {
  try {
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
