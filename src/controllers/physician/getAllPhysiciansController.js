import getAllPhysiciansHandler from "../../handlers/physicianHandlers/getAllPhysiciansHandler.js";

const getAllPhysiciansController = async (req, res) => {
  const { limit, page, name, lastname} = req.query;

  try {
    const allPhysicians = await getAllPhysiciansHandler({ limit, page, name, lastname });
    res.status(200).json(allPhysicians);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getAllPhysiciansController;
