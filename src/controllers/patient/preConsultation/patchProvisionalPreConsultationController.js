import SegimedAPIError from "../../../error/SegimedAPIError.js";
import patchProvisionalPreConsultationHandler from "../../../handlers/patient/preConsultation/patchProvisionalPreConsultationHandler.js";
import updateVitalSignsHandler from "../../../handlers/vitalSigns/updateVitalSignsHandler.js";

const patchProvisionalPreConsultationController = async (req, res) => {
  try {
    let { vitalSignsToUpdate } = req.body;
    const updatedPreconsultation = await patchProvisionalPreConsultationHandler(
      req.body
    );
    const updatedVitalSigns = await updateVitalSignsHandler(vitalSignsToUpdate);

    // const updatedPhysicalExamination = await
    return res.status(200).json({ updatedPreconsultation, updatedVitalSigns });
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de actualización.",
      error,
      500
    );
  }
};

export default patchProvisionalPreConsultationController;
