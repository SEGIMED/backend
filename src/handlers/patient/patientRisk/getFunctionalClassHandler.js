import models from "../../../databaseConfig.js";

const getFunctionalClassHandler = async ({ medicalEvent, patient }) => {
  try {
    let patientId;
    if (medicalEvent) {
      const medicalEventData = await models.MedicalEvent.findByPk(medicalEvent);
      const existingPreconsultation =
        await models.ProvisionalPreConsultation.findOne({
          where: { appointmentSchedule: medicalEventData.scheduling },
        });
      patientId = existingPreconsultation.patient;
    }
    const functionalClass = await models.PatientFunctionalClass.findOne({
      where: {
        patient: patient ?? patientId,
      },
      attributes:["class"],
      include:{
        model: models.CatRisk,
        as:"category",
        attributes:["name"]
      }
    });
    return functionalClass;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar la clase funcional: " + error.message
    );
  }
};

export default getFunctionalClassHandler;
