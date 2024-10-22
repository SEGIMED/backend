import models from "../../databaseConfig.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getDiagnosticHandler = async ({
  patientId,
  physicianId,
  medicalSpecialtyId,
  page,
  limit,
}) => {
  try {
    const where = {
      schedulingStatus: 2,
      patient: patientId,
    };
    physicianId ? (where.physician = physicianId) : null;
    medicalSpecialtyId ? (where.medicalSpecialty = medicalSpecialtyId) : null;
    const medicalEvent = await models.MedicalEvent.findAll({
      attributes: ["id", "diagnosticNotes", "alarmPattern"],
      include: [
        {
          model: models.PatientDiagnostics,
          as: "medicalEventDiagnostics",
          attributes: ["id"],
          include: {
            model: models.SubCategoriesCieDiez,
            as: "cie10subCategory",
            attributes: ["description"],
          },
        },
        {
          model: models.MedicalIndications,
          as: "medicalIndications",
          attributes: ["description"],
        },
        {
          model: models.MedicalProcedurePrescription,
          as: "procedurePrescriptions",
          attributes: ["medicalProcedure", "medicalProcedureName"],
        },
        {
          model: models.AppointmentScheduling,
          as: "appSch",
          where,
          attributes: ["scheduledStartTimestamp", "reasonForConsultation"],
          include: [
            {
              model: models.User,
              as: "patientUser",
              attributes: ["id"],
              include: [
                {
                  model: models.PatientPulmonaryHypertensionGroup,
                  as: "userHpGroups",
                  attributes: ["id"],
                  include: [
                    {
                      model: models.CatRisk,
                      as: "catHpGroup",
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
            {
              model: models.PhysicianAttendancePlace,
              as: "attendancePlace",
            },
          ],
        },
      ],
    });
    if (page && limit) {
      const paginated = universalPaginationHandler(medicalEvent, page, limit);
      return paginated;
    }
    return medicalEvent;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al recuperar los diagnosticos: " + error.message
    );
  }
};

export default getDiagnosticHandler;
