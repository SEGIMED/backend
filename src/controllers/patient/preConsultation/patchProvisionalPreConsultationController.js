import SegimedAPIError from "../../../error/SegimedAPIError.js";
import patchProvisionalPreConsultationHandler from "../../../handlers/patient/preConsultation/patchProvisionalPreConsultationHandler.js";
import updateVitalSignsHandler from "../../../handlers/vitalSigns/updateVitalSignsHandler.js";
import patchPatientPainMapHandler from "../../../handlers/painMap/patchPatientPainMapHandler.js";

const patchProvisionalPreConsultationController = async (req, res) => {
  try {
  
    const validate = validateDuplicatePainArea(req.body.painRecordsToUpdate[0]);

    if (validate === false) throw new Error("Area de dolor duplicada");

    const { vitalSignsToUpdate } = req.body;
    const { painRecordsToUpdate } = req.body;

    const updatedPreconsultation = await patchProvisionalPreConsultationHandler(
      req.body
    );
    const updatedVitalSigns = await updateVitalSignsHandler(vitalSignsToUpdate);
    const updatedPainRecords = await patchPatientPainMapHandler(
      painRecordsToUpdate[0]
    );

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

const validateDuplicatePainArea = (painRecordsToCreate) => {
  const seenPainAreas = new Set();
  for (const obj of painRecordsToCreate.painAreas) {
    if (seenPainAreas.has(obj.painArea)) {
      return false;
    }
    seenPainAreas.add(obj.painArea);
  }
  return true;
};
