import createSociodemographicDetailHandler from "../../handlers/sociodemographicDetails/createSociodemographicDetailsHandler.js";

const createSociodemographicDetailsController = async (req, res) => {
  try {
    const newSociodemographicDetail = req.body;
    const detail = await createSociodemographicDetailHandler(
      newSociodemographicDetail
    );
    return res.status(200).json(detail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createSociodemographicDetailsController;
