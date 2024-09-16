import getDiagnosticsTabHandler from "../../../handlers/medicalEvent/consultationTabs/extras/getDiagnosticsTabHandler.js";
import getVitalSignsByMedicalEventHandler from "../../../handlers/vitalSigns/getVitalSignsByMedicalEventHandler.js";

const getConsultationTabController = async (req, res) => {
  try {
    const { id } = req.query;
    const vitalSigns = await getVitalSignsByMedicalEventHandler({id});
    const diagnostic = await getDiagnosticsTabHandler({id})
    
    const response = {
      vitalSigns,
      evolution: diagnostic.physicianComments,
      diagnostic,
      anamnesis: diagnostic.historyOfPresentIllness
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default getConsultationTabController;
