import models from "../../databaseConfig.js";

const getDiagnosticHandler = async (patientId) => {
  try {
    const medicalEvent = await models.MedicalEvent.findAll({
      attributes: ["id", "diagnosticNotes", "alarmPattern"],
      include: [
        {
          model: models.PatientDiagnostics,
          as: "medicalEventDiagnostics",
          attributes:["id"],
          include: {
            model: models.SubCategoriesCieDiez,
            as:"cie10subCategory",
            attributes: ["description"]
          }
        },
        {
            model:models.MedicalIndications,
            as:"medicalIndications",
            attributes:["description"]
        },{
            model: models.MedicalProcedurePrescription,
            as:"procedurePrescriptions",
            attributes:["medicalProcedure","medicalProcedureName"]
        },{
            model:models.TherapyPrescription,
            as:"therapyPrescriptions",
            attributes:["therapyDescription","quantity","therapy"]
        },
        {
          model: models.AppointmentScheduling,
          as: "appSch",
          where: {
            schedulingStatus: 2,
            patient: patientId,
          },
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
                      model: models.CatPulmonaryHypertensionGroup,
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
    return medicalEvent;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al recuperar los diagnosticos: " + error.message
    );
  }
};

export default getDiagnosticHandler;
