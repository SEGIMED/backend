import patchProvisionalPreConsultationHandler from "../../../handlers/patient/preConsultation/patchProvisionalPreConsultationHandler.js";
import updateVitalSignsHandler from "../../../handlers/vitalSigns/updateVitalSignsHandler.js";
import patchPatientPainMapHandler from "../../../handlers/painMap/patchPatientPainMapHandler.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const patchProvisionalPreConsultationController = async (req, res) => {

  try {
    const updatedPreconsultation = await patchProvisionalPreConsultationHandler(
      req.body
    );
    console.log("asdasd")
    const updatedVitalSigns = await updateVitalSignsHandler(req.body);
    console.log("asdasd")
    const updatedPainRecords = await patchPatientPainMapHandler(req.body);
    console.log("asdasd")
    return res
      .status(200)
      .json({ updatedPreconsultation, updatedVitalSigns, updatedPainRecords });
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de actualización.",
      error,
      500
    );
  }
};

export default patchProvisionalPreConsultationController;
