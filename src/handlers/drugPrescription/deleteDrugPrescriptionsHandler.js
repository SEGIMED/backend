import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const deleteDrugPrescriptionsHandler = async (id, deactivate) => {
  try {
    const medicationPrescription = await models.MedicationPrescription.findByPk(
      id
    );

    if (!medicationPrescription) {
      throw new SegimedAPIError(
        "No se encontró la prescripción indicada.",
        500
      );
    }

    if (medicationPrescription.deleted) {
      throw new SegimedAPIError(
        "No se puede desactivar una prescripción eliminada.",
        500
      );
    }
    if (!medicationPrescription.active) {
      throw new SegimedAPIError("La prescripción esta desactivada.", 500);
    }

    if (deactivate) {
      await medicationPrescription.update({
        active: false,
      });
    } else {
      await medicationPrescription.update({
        deleted: true,
        active: false,
      });
    }
  } catch (error) {
    throw new SegimedAPIError(
      `Hubo un error al eliminar la prescripción: ${error.message}`,
      500
    );
  }
};

export default deleteDrugPrescriptionsHandler;
