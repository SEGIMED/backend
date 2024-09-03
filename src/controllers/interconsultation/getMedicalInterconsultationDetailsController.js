import getInterconsultationDetailsHandler from "../../handlers/interconsultation/getInterconsultationDetailsHandler.js";

const getInterconsultationDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const interconsultationDetails = await getInterconsultationDetailsHandler(
      id
    );
    return res.status(200).json(interconsultationDetails);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getInterconsultationDetailsController;
