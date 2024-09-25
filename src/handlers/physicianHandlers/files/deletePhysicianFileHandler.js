import deletePhysicianFileHandler from "../../../controllers/physician/files/deletePhysicianFilesController.js";

const deletePhysicianFileController = async (req, res) => {
  try {
    const { id } = req.query; // Recibe el ID del archivo para eliminar
    const response = await deletePhysicianFileHandler({ fileId: id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default deletePhysicianFileController;
