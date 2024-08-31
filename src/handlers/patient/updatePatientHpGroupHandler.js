import moment from "moment";
import { PatientPulmonaryHypertensionGroup } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
const TZ = process.env.TZ;
const updatePatientHpGroupHandler = async (body) => {
  const { patientId, hpGroups, physicianId } = body;

  try {
    const existingHPgroup = await PatientPulmonaryHypertensionGroup.findAll({
      where: {
        patient: patientId,
      },
    });

    const existingIds = existingHPgroup.map((group) => group.group);
    const toAdd = hpGroups.filter((id) => !existingIds.includes(id));
    const toRemove = existingIds.filter((id) => !hpGroups.includes(id));

    if (toAdd.length > 0) {
      const newGroups = toAdd.map((group) => ({
        patient: patientId,
        group,
        physician: physicianId,
        timestamp: moment().tz(TZ).toISOString(),
      }));
      await PatientPulmonaryHypertensionGroup.bulkCreate(newGroups);
    }
    if (toRemove.length > 0) {
      await PatientPulmonaryHypertensionGroup.destroy({
        where: {
          patient: patientId,
          group: toRemove,
        },
      });
    }
    return "HTP actualizado correctamente";
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de actualización.",
      500
    );
  }
};

export default updatePatientHpGroupHandler;
