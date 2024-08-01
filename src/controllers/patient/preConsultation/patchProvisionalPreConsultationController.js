import patchProvisionalPreConsultationHandler from "../../../handlers/patient/preConsultation/patchProvisionalPreConsultationHandler.js";
import updateVitalSignsHandler from "../../../handlers/vitalSigns/updateVitalSignsHandler.js";
import patchPatientPainMapHandler from "../../../handlers/painMap/patchPatientPainMapHandler.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const patchProvisionalPreConsultationController = async (req, res) => {
  try {
    const updatedPreconsultation = await patchProvisionalPreConsultationHandler(
      req.body
    );
    const updatedVitalSigns = await updateVitalSignsHandler(req.body);
    const updatedPainRecords = await patchPatientPainMapHandler(req.body);

    return res
      .status(200)
      .json({ updatedPreconsultation, updatedVitalSigns, updatedPainRecords });
  } catch (error) {
    if (error instanceof SegimedAPIError) {
      return res
        .status(error.errorCode)
        .json({ error: error.message });
    } else {
      return res
        .status(500)
        .json({ error: "Error durante el proceso de actualización de la preconsulta: " + error.message });
    }
  }
};

export default patchProvisionalPreConsultationController;
