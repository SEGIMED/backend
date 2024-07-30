import patchProvisionalPreConsultationHandler from "../../../handlers/patient/preConsultation/patchProvisionalPreConsultationHandler.js";
import updateVitalSignsHandler from "../../../handlers/vitalSigns/updateVitalSignsHandler.js";
import patchPatientPainMapHandler from "../../../handlers/painMap/patchPatientPainMapHandler.js";

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
    throw new Error(
      "Hubo un error durante el proceso de actualización." + error.message
    );
  }
};

export default patchProvisionalPreConsultationController;
