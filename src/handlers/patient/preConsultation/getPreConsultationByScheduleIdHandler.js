import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import { consultationVitalSignsMapper } from "../../../mapper/patient/consultationVitalSignsMapper.js";

const getPreConsultationByScheduleIdHandler = async (scheduleId) => {
    try {
        const preConsultations = await models.ProvisionalPreConsultation.findAll(
          {
            where: {
                appointmentSchedule:scheduleId,
            },
            include: [
              {
                model: models.PatientPainMap,
                as: "provisionalPreConsultationPainMap",
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
              },
              {
                model: models.AppointmentScheduling,
                as: "ProvisionalPreConsultationSchedule",
                include: [
                  {
                    model: models.VitalSignDetails,
                    as: "vitalSignDetailsScheduling",
                    //Indicate to make separate request for each model
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
          }
        );
        if (preConsultations.length === 0) {
          throw new SegimedAPIError("No se encontraron preconsultas para el ID de programación proporcionado.", 404);
        }
    
        const preConsultation = preConsultations[0];
        const vitalSignDetails = preConsultation.ProvisionalPreConsultationSchedule.vitalSignDetailsScheduling;
       
        const filteredVitalSigns = await consultationVitalSignsMapper(vitalSignDetails);
        preConsultation["ProvisionalPreConsultationSchedule"]["vitalSignDetailsScheduling"] = filteredVitalSigns;
        return {preConsultation,filteredVitalSigns};
      } catch (error) {
        throw new SegimedAPIError(
          "Error al cargar los detalles de la preconsulta ",
          500
        );
      }
};

export default getPreConsultationByScheduleIdHandler;
