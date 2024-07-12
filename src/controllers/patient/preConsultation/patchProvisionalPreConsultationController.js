import patchProvisionalPreConsultationHandler from "../../../handlers/patient/preConsultation/patchProvisionalPreConsultationHandler.js";
import updateVitalSignsHandler from "../../../handlers/vitalSigns/updateVitalSignsHandler.js";
import patchPatientPainMapHandler from "../../../handlers/painMap/patchPatientPainMapHandler.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const patchProvisionalPreConsultationController = async (req, res) => {
  console.log(req)
  try {
    let { vitalSignsToUpdate } = req.body;
    const updatedPreconsultation = await patchProvisionalPreConsultationHandler(
      req.body
    );
    const updatedVitalSigns = await updateVitalSignsHandler(vitalSignsToUpdate);
     const updatedPainRecords = await patchPatientPainMapHandler(
          painRecordsToUpdate[0]
        );
        
      return res.status(200).json({ updatedPreconsultation, updatedVitalSigns, updatedPainRecords });
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de actualización.",
      error,
      500
    );
  }
};

export default patchProvisionalPreConsultationController;
