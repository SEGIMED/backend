import models, { CatSchedulingStatus } from "../../../databaseConfig.js";
import { painAreaNameMap } from "../../../mapper/painMap/painMapMapper.js";
import { consultationVitalSignsMapper } from "../../../mapper/patient/consultationVitalSignsMapper.js";
import contextService from "request-context";

const getPreConsultationByScheduleIdHandler = async (
  scheduleId,
  status = 1
) => {
  const userType = contextService.get("request:user").role;

  const validStatusesResult =
    await models.CatSchedulingStatus.findAndCountAll();
  const validStatuses = validStatusesResult.rows.map((row) => parseInt(row.id));

  if (status && !validStatuses.includes(parseInt(status))) {
    throw new Error(
      `El estado proporcionado no es válido. Debe ser un número del 1 al ${validStatuses.length}.`
    );
  }

  try {
    let preConsultation = await models.ProvisionalPreConsultation.findOne({
      where: {
        appointmentSchedule: scheduleId,
      },
      include: [
        {
          model: models.AppointmentScheduling,
          as: "appointmentScheduleDetails",
          attributes: {
            exclude: ["appointment_schedule", "patient", "appointmentSchedule"],
          },
          include: [
            {
              model: models.VitalSignDetails,
              as: "vitalSignDetailsScheduling",
              separate: true,
              attributes: ["measure"],
              include: [
                {
                  model: models.CatVitalSignMeasureType,
                  as: "vitalSignMeasureType",
                  attributes: ["name"],
                  include: [
                    {
                      model: models.CatMeasureUnit,
                      as: "measUnit",
                      attributes: ["name"],
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
          attributes: ["name"],
        },
        {
          model: models.CatPainType,
          as: "painTypeDetail",
          attributes: ["name"],
        },
        {
          model: models.CatPainScale,
          as: "painScaleDetail",
          attributes: ["name"],
        },
        {
          model: models.CatPainFrequency,
          as: "painFrequencyDetail",
          attributes: ["name"],
        },
        {
          model: models.User,
          as: "painRecorderUser",
          attributes: ["id"],
        },
      ],
    });
    if (!preConsultation) {
      throw new Error(
        "No se encontraron preconsultas para el ID de programación proporcionado."
      );
    }

    preConsultation = preConsultation.get({ plain: true });
    const preConsultationStatusId =
      preConsultation.appointmentScheduleDetails.status.id;

    if ((userType !== "Médico") & (parseInt(preConsultationStatusId) === 2)) {
      throw new Error("No está autorizado a ver la preconsulta.");
    }

    const vitalSignDetails =
      preConsultation.appointmentScheduleDetails.vitalSignDetailsScheduling;

    const filteredVitalSigns = await consultationVitalSignsMapper(
      vitalSignDetails
    );
   const painMapJson = painAreas.toJSON();
    preConsultation.appointmentScheduleDetails.PainMap = {
      ...painMapJson,
      painAreas: painMapJson?.painAreas?.map((area) => ({
        painArea: painAreaNameMap(parseInt(area.painArea)),
        painNotes: area.painNotes,
      })),
    };
    preConsultation.appointmentScheduleDetails.vitalSignDetailsScheduling =
      filteredVitalSigns;

    return preConsultation;
  } catch (error) {
    if (
      error.message ===
        "No se encontraron preconsultas para el ID de programación proporcionado." ||
      error.message === "No está autorizado a ver la preconsulta." ||
      error.message ===
        "El estado de la preconsulta no coincide con el estado proporcionado."
    ) {
      throw error;
    } else {
      console.log(error);
      throw new Error("Error al cargar los detalles de la preconsulta.");
    }
  }
};

export default getPreConsultationByScheduleIdHandler;
