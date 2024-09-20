import models, { SociodemographicDetails } from "../../../../databaseConfig.js";

const getPatientDataHandler = async ({ id }) => {
  try {
    const medicalEvent = await models.MedicalEvent.findByPk(id);
    if (!medicalEvent) throw new Error("Evento médico no encontrado");

    const appointmentSchedule = await models.AppointmentScheduling.findOne({
      where: {
        id: medicalEvent.scheduling,
      },
    });
    if (!appointmentSchedule) throw new Error("Cita no encontrada");

    const patientId = appointmentSchedule.patient;

    const patient = await models.User.findByPk(patientId, {
      attributes: ["idNumber", "name", "lastname", "cellphone", "email"],
    });
    if (!patient) throw new Error("Paciente no encontrado");
    const sociodemographic = await SociodemographicDetails.findOne({
      where: {
        patient: patientId,
      },
      attributes: [
        "birthDate",
        "healthCarePlan",
        "healthCareNumber",
        "genre",
        "numberOfFamilyAsistence",
      ],
      include:{
        model: models.CatGenre,
        as:"catGenre",
        attributes:["name"]
      }
    });

    const patientData = patient.toJSON();
    const sociodemographicData = sociodemographic
      ? sociodemographic.toJSON()
      : {};

    return { ...patientData, ...sociodemographicData };
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar los datos del paciente: " + error.message
    );
  }
};
export default getPatientDataHandler;
