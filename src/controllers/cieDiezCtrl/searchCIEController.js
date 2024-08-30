import searchCIEHandler from "../../handlers/cieDiez/searchCIEHandler.js";

const searchCIEController = async (req, res) => {
  try {
    const { search } = req.query;
    const result = await searchCIEHandler(search);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Hubo un error al recuperar el listado: " + error);
  }
};
export default searchCIEController;
