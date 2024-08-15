import { Sequelize } from "sequelize";
import models from "../../databaseConfig.js";

const getDrugPrescriptionHandler = async (id) => {
  try {
    const medicationPrescriptions = await models.MedicationPrescription.findAll(
      {
        where: {
          patient_id: id,
          active: true,
          deleted: false,
        },
        attributes: ["id", "startTimestamp", "physicianId"],
        include: [
          {
            model: models.PrescriptionMofidicationsHistory,
            as: "medicationPrescription",
            separate: true,
            attributes: [
              "doseMeasure",
              "observations",
              "indications",
              "modificationTimestamp",
              "timeMeasure",
              "timeMeasureType",
            ],
            include: [
              {
                model: models.User,
                as: "physicianModification",
                attributes: ["name", "lastname"],
              },
              {
                model: models.DrugDetailPresentation,
                as: "drugDetailPresentation",
                attributes: ["id", "dose"],
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
            order: [['modificationTimestamp', 'DESC']],
            limit: 1,
          },
          {
            model: models.User,
            as: "physician",
            attributes: ["name", "lastname"],
          },
        ],
      }
    );
    return medicationPrescriptions;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al obtener las prescripciones");
  }
};

export default getDrugPrescriptionHandler;
