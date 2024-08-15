import SegimedAPIError from "../../error/SegimedAPIError.js";
import deleteDrugPrescriptionsHandler from "../../handlers/drugPrescription/deleteDrugPrescriptionsHandler.js";

const deleteDrugPrescriptionController = async (req, res) => {
  try {
    const { id, deactivate } = req.query;

    await deleteDrugPrescriptionsHandler(id, deactivate);

    return res
      .status(200)
      .json({ message: "La prescripción ha sido eliminada exitosamente." });
  } catch (error) {
    if (error instanceof SegimedAPIError) {
      return res.status(500).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "Error inesperado al borrar la prescripción." });
  }
};

export default deleteDrugPrescriptionController;
