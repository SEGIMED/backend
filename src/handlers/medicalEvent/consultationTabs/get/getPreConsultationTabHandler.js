import models from "../../../../databaseConfig.js";
import { painAreaNameMap } from "../../../../mapper/painMap/painMapMapper.js";

const getPreConsultationTabHandler = async ({ id }) => {
  try {
    const response = await models.MedicalEvent.findByPk(id, {
      attributes: ["id"],
      include: [
        {
          model: models.PatientPainMap,
          as: "patientPainMap",
          attributes: {
            exclude: [
              "painOwner",
              "painRecorder",
              "medicalEvent",
              "selfEvaluationEvent",
            ],
          },
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
            attributes: {
              exclude: [
                "appointment_schedule",
                "patient",
                "appointmentSchedule",
              ],
            },
          },
        },
      ],
    });


    const formattedResponse = response.toJSON();
    if (formattedResponse.patientPainMap && formattedResponse.patientPainMap.painAreas) {
      formattedResponse.patientPainMap.painAreas = formattedResponse.patientPainMap.painAreas.map((area) => ({
        painArea: painAreaNameMap(parseInt(area.painArea)), 
        painNotes: area.painNotes,
      }));
    }

    return formattedResponse;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar la preconsulta: " + error.message
    );
  }
};

export default getPreConsultationTabHandler;
