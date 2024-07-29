import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import { consultationVitalSignsMapper } from "../../../mapper/patient/consultationVitalSignsMapper.js";

const getPreConsultationByScheduleIdHandler = async (scheduleId) => {
  try {

    let preConsultation = await models.ProvisionalPreConsultation.findOne({
      where: {
        appointmentSchedule: scheduleId,
      },
      include: [
        {
          model: models.PatientPainMap,
          as: "provisionalPreConsultationPainMap",
        },
        {
          model: models.AppointmentScheduling,
          as: "ProvisionalPreConsultationSchedule",
          include: [
            {
              model: models.VitalSignDetails,
              as: "vitalSignDetailsScheduling",
              separate: true,
              include: [
                {
                  model: models.CatVitalSignMeasureType,
                  as: "vitalSignMeasureType",
                  include: [
                    {
                      model: models.CatMeasureUnit,
                      as: "measUnit",
                    },
                  ],
                },
              ],
            },
            {
              model: models.User,
              as: "patientUser",
              attributes: ["name", "lastname", "id"],
            },
            {
              model: models.User,
              as: "physicianThatAttend",
              attributes: ["name", "lastname", "id"],
            },
            {
              model: models.CatMedicalSpecialty,
              as: "specialty",
            },
            {
              model: models.CatSchedulingStatus,
              as: "status",
            },
            {
              model: models.CatAppointmentModality,
              as: "appointmentModality",
            },
            {
              model: models.PhysicianAttendancePlace,
              as: "attendancePlace",
            },
          ],
        },
      ],
    });
    const painAreas = await models.PatientPainMap.findOne({
      where: {
        scheduling: scheduleId,
      },
      include: [
        {
          model: models.CatPainDuration,
          as: "catPainDuration",
        },
        {
          model: models.CatPainScale,
          as: "catPainScale",
        },
        {
          model: models.CatPainType,
          as: "catPainType",
        },
        {
          model: models.CatPainFrequency,
          as: "catPainFrequency",
        },
        {
          model: models.User,
          as: "painRecorderUser",
        },
      ],
    });

    if (!preConsultation) {
      throw new SegimedAPIError(
        "No se encontraron preconsultas para el ID de programación proporcionado.",
        404
      );
    }

     preConsultation = preConsultation.get({ plain: true }); //Era lo que faltaba
    const vitalSignDetails =
      preConsultation.ProvisionalPreConsultationSchedule
        .vitalSignDetailsScheduling;

    const filteredVitalSigns = await consultationVitalSignsMapper(
      vitalSignDetails
    );
    preConsultation.provisionalPreConsultationPainMap = painAreas;
    preConsultation.ProvisionalPreConsultationSchedule.vitalSignDetailsScheduling =
      filteredVitalSigns;

    return preConsultation;
  } catch (error) {
    throw new SegimedAPIError(
      "Error al cargar los detalles de la preconsulta ",
      500
    );
  }
};

export default getPreConsultationByScheduleIdHandler;
