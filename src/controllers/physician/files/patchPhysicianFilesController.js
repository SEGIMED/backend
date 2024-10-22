import patchPhysicianFilesHandler from "../../../handlers/physicianHandlers/files/patchPhysicianFilesHandler.js";

const patchPhysicianFilesController = async (req, res) => {
  try {
    const { files } = req.body;
    console.log("asdasads")
    const response = await patchPhysicianFilesHandler({ files });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default patchPhysicianFilesController;
