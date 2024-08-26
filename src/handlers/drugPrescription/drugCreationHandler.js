import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const drugCreationHandler = async (body, transaction) => {
  const {
    drugName,
    commercialDrugName,
    presentationId,
    dose,
    measureUnitId,
    routeOfAdministrationId,
  } = body;
  try {
    //Se busca si existe o no la droga ingresada, si no existe se crea
    const drugResult = await models.CatDrug.findOrCreate({
      where: { name: drugName },
      defaults: {
        name: drugName,
      },
      transaction,
    });

    const [drug, drugCreated] = drugResult;

    if (!Array.isArray(drugResult) || drugResult.length !== 2) {
      throw new Error("Unexpected result format from findOrCreate for CatDrug");
    }

    //Se busca si existe o no el nombre comercial, si no existe se crea
    const commercialDrugResult =
      await models.CatCommercialNameDrug.findOrCreate({
        where: { name: commercialDrugName, drugId: drug.id },
        defaults: { name: commercialDrugName, drugId: drug.id },
        transaction,
      });
    if (
      !Array.isArray(commercialDrugResult) ||
      commercialDrugResult.length !== 2
    ) {
      throw new Error(
        "Unexpected result format from findOrCreate for CatCommercialNameDrug"
      );
    }

    // Buscar o crear el detalle de presentación
    const drugDetailPresentationResult =
      await models.DrugDetailPresentation.findOrCreate({
        where: { drugId: drug.id, dose },
        defaults: {
          drugId: drug.id,
          presentationId,
          dose,
          measureUnitId,
          routeOfAdministrationId,
        },
        transaction,
      });

    if (
      !Array.isArray(drugDetailPresentationResult) ||
      drugDetailPresentationResult.length !== 2
    ) {
      throw new Error(
        "Unexpected result format from findOrCreate for DrugDetailPresentation"
      );
    }

    const [drugDetailPresentation, drugDetailCreated] =
      drugDetailPresentationResult;

    drugDetailPresentation.commercialNameDrugId = commercialDrugResult[0].id;

    return drugDetailPresentation;
  } catch (error) {
    console.error(error);
    throw new SegimedAPIError("Hubo un error durante en la prescripción.", 500);
  }
};

export default drugCreationHandler;
