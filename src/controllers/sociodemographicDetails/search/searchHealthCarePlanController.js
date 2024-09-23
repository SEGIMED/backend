import searchHealthCarePlanHandler from "../../../handlers/sociodemographicDetails/search/searchHealthCarePlanHandler.js";

const searchHealthCarePlanController = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search || search.length < 3) {
      throw new Error("Debe mandar al menos 3 caracteres");
    }

    const response = await searchHealthCarePlanHandler({ search });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default searchHealthCarePlanController;
