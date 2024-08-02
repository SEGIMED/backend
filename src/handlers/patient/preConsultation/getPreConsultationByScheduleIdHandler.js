import models, { CatSchedulingStatus } from "../../../databaseConfig.js";
import { consultationVitalSignsMapper } from "../../../mapper/patient/consultationVitalSignsMapper.js";
import contextService from "request-context";

const getPreConsultationByScheduleIdHandler = async (scheduleId, status) => {
  
  const userType = contextService.get('request:user').role

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
        appointmentSchedule: scheduleId
      },
      include: [
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
      throw new Error("No se encontraron preconsultas para el ID de programación proporcionado.");
    }

    preConsultation = preConsultation.get({ plain: true });
    const preConsultationStatusId = preConsultation.ProvisionalPreConsultationSchedule.status.id;
    
    if (userType!=="Médico" & parseInt(preConsultationStatusId) === 2) {
      throw new Error("No está autorizado a ver la preconsulta.");
    }

    if (status && preConsultationStatusId !== status) {
      throw new Error("El estado de la preconsulta no coincide con el estado proporcionado.");
    }

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
    if (error.message === "No se encontraron preconsultas para el ID de programación proporcionado." ||
      error.message === "No está autorizado a ver la preconsulta." ||
      error.message === "El estado de la preconsulta no coincide con el estado proporcionado.") {
    throw error; 
  } else {
    throw new Error("Error al cargar los detalles de la preconsulta.");
  }
  }
};

export default getPreConsultationByScheduleIdHandler;
