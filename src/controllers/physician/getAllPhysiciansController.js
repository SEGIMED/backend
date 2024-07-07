import getAllPhysiciansHandler from "../../handlers/physicianHandlers/getAllPhysiciansHandler.js";

const getAllPhysiciansController = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const allPhysicians = await getAllPhysiciansHandler({ page, limit });
    res.status(200).json(allPhysicians);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getAllPhysiciansController;
