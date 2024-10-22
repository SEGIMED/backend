import getPhysicianFilesHandler from "../../../controllers/physician/files/getPhysicianFilesController.js";

const getPhysicianFilesController = async (req, res) => {
  try {
    const { physicianId } = req.query; 
    const response = await getPhysicianFilesHandler({ physicianId });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getPhysicianFilesController;
