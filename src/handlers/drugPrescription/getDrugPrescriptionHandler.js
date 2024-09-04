import { Sequelize, Op } from "sequelize";
import models from "../../databaseConfig.js";
import moment from "moment";
const TZ = process.env.TZ

const getDrugPrescriptionHandler = async (id) => {
  try {

  
    const medicationPrescriptions = await models.MedicationPrescription.findAll({
      where: {
        patient_id: id,
        active: true,
        deleted: false,
      },
      attributes: ["id", "startTimestamp", "physicianId"],
      include: [
        {
          model: models.User,
          as: "physician",
          attributes: ["name", "lastname"],
        },
      ],
    });


    for (const prescription of medicationPrescriptions) {
      const lastModification = await models.PrescriptionModificationsHistory.findOne({
        where: {
          medicationPrescriptionId: prescription.id,
        },
        order: [["modificationTimestamp", "DESC"]],
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
          },{
            model: models.PhysicianOrders,
            as:"medicalOrder",
            attributes: ["orderPdf"]
          }
        ],
      });
      

      prescription.setDataValue("lastModification", lastModification);
    }

    return medicationPrescriptions;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al obtener las prescripciones");
  }
};

export default getDrugPrescriptionHandler;
