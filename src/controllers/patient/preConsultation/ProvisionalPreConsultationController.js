import createPreConsultationHandler from "../../../handlers/patient/preConsultation/ProvisionalPreConsultationHandler.js";
import createVitalSignsHandler from "../../../handlers/vitalSigns/createVitalSignsHandler.js";
import createPatientPainMapHandler from "../../../handlers/painMap/createPatientPainMapHandler.js";

const createPreConsultationController = async (req, res) => {
  try {
    const preConsultation = await createPreConsultationHandler(req.body);
    const vitalSigns = await createVitalSignsHandler(
      req.body.vitalSignsToCreate
    ); //It receives an array of vital signs

    const physicalExamination = await createPatientPainMapHandler(
      req.body.painRecordsToCreate[0]
    );

    return res
      .status(201)
      .json({ preConsultation, vitalSigns, physicalExamination });
  } catch (error) {
    return res.status(500).json({
      "Hubo un error durante el proceso de creación: ": error.message,
    });
  }
};

export default createPreConsultationController;
