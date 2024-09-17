import getBackgroundHandler from "../../../handlers/medicalEvent/consultationTabs/getBackgroundTabHandler.js";

const getBackgroundTabController = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await getBackgroundHandler({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default getBackgroundTabController;
