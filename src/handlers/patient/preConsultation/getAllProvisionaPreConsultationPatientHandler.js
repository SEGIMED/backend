import models from "../../../databaseConfig.js";
import segimedAPIError from "../../../error/SegimedAPIError.js";

const getAllProvisionaPreConsultationHandler = async (patientId) => {
  try {
    const allPreConsultations = await models.ProvisionalPreConsultation.findAll(
      {
        where: {
          patient: patientId,
        },
        include: [
          {
            model: models.PatientPainMap,
            as: "provisionalPreConsultationPainMap",
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
              {
                model: models.User,
                as: "painRecorderUser",
              },
            ],
          },
          {
            model: models.AppointmentScheduling,
            as: "ProvisionalPreConsultation",
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
    return allPreConsultations;
  } catch (error) {
    throw new segimedAPIError(
      "Error al cargar los detalles de la preconsulta ",
      500
    );
  }
};

export default getAllProvisionaPreConsultationHandler;