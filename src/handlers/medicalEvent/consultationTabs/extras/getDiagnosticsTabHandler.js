import models from "../../../../databaseConfig.js";

const getDiagnosticsTabHandler = async ({ id }) => {
  //Incluye diagnosticos y evoluciones
  try {
    const diagnostic = await models.MedicalEvent.findByPk(id, {
      include: [
        {
          model: models.CatConsultationReason,
          as: "reasonForConsultation",
          attributes: ["description"],
        },
        {
          model: models.MedicalIndications,
          as: "medicalIndications",
          attributes: ["description"],
        },
        {
          //procedimientos
          model: models.MedicalProcedurePrescription,
          as: "procedurePrescriptions",
          attributes: ["medicalProcedure", "medicalProcedureName"],
        },
        {
          model: models.SubCategoriesCieDiez,
          as: "mainDiagnostic",
          attributes: ["description"],
        },
        {
          model: models.PatientDiagnostics,
          as: "medicalEventDiagnostics",
          attributes: ["id", "diagnostic"],
          include: {
            model: models.SubCategoriesCieDiez,
            as: "cie10subCategory",
            attributes: ["description"],
          },
        },
        {
          model: models.MedicationPrescription,
          as: "prescriptions",
          required: false,
          where: {
            active: true,
            deleted: false,
          },
          attributes: {
            exclude: [
              "patientId",
              "physicianId",
              "medicalEventId",
              "active",
              "deleted",
              "medicalOrderId",
              "endTimestamp",
            ],
          },
          include: {
            model: models.PrescriptionModificationsHistory,
            as: "medicationPrescription",
            attributes: {
              exclude: [
                "id",
                "medicalOrderId",
                "medicalEventId",
                "physicianId",
                "medicationPrescriptionId",
              ],
            },
            limit: 1,
            order: [["modificationTimestamp", "DESC"]],
            include: [
              {
                model: models.DrugDetailPresentation,
                as: "drugDetailPresentations",
                attributes: ["dose"],
                include: [
                  {
                    model: models.CatDrug,
                    as: "drugName",
                    attributes: ["name"],
                  },
                  {
                    model: models.CatRouteOfAdministration,
                    as: "routeOfAdministration",
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: models.CatCommercialNameDrug,
                as: "commercialName",
                attributes: ["name"],
              },
            ],
          },
        },
      ],
    });
    console.log(diagnostic);
    return diagnostic;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al recuperar el diagnostico: " + error.message
    );
  }
};

export default getDiagnosticsTabHandler;
