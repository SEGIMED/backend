
import SegimedAPIError from "../../error/SegimedAPIError.js";
import getDrugPrescriptionHandler from "../../handlers/drugPrescription/getDrugPrescriptionHandler.js";

const getDrugPrescriptionController = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await getDrugPrescriptionHandler(id);
    return res.status(200).json(data);
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error al recuperar los datos" + error.message,
      500
    );
  }
};

export default getDrugPrescriptionController;
