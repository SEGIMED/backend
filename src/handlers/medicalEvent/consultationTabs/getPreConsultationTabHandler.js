import models from "../../../databaseConfig.js";

const getPreConsultationTabHandler = async ({ id }) => {
  try {
    const response = await models.MedicalEvent.findByPk(id, {
      attributes: ["id"],
      include: [
        {
          model: models.PatientPainMap,
          as: "patientPainMap",
          attributes:{exclude:["painOwner","painRecorder","medicalEvent","selfEvaluationEvent"]},
          include: [
            {
              model: models.CatPainDuration,
              as: "painDurationDetail",
            },
            {
              model: models.CatPainType,
              as: "painTypeDetail",
            },
            {
              model: models.CatPainScale,
              as: "painScaleDetail",
            },
            {
              model: models.CatPainFrequency,
              as: "painFrequencyDetail",
            },
          ],
        },
        {
          model: models.AppointmentScheduling,
          as: "appSch",
          attributes: ["id"],
          include: {
            model: models.ProvisionalPreConsultation,
            as: "ProvisionalPreConsultation",
            attributes:{
                exclude:["appointment_schedule","patient","appointmentSchedule"]
            }
          },
        },
      ],
    });
    return response;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al recuperar la preconsulta: " + error.message
    );
  }
};
export default getPreConsultationTabHandler;
