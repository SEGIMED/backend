import getCatAndSubCat from "../../handlers/cieDiez/getCat&SubCat.js";

const getCatAndSubCatCtrl = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const categories = await getCatAndSubCat(page, limit);
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default getCatAndSubCatCtrl;
