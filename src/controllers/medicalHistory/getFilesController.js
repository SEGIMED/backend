import getFilesHandler from "../../handlers/medicalHistory/getFilesHandler.js";

const getFilesController = async (req, res) => {
  try {
    const { userId, studyType, limit, page } = req.query;

    const files = await getFilesHandler(userId, studyType, limit, page);

    return res.status(200).json(files);
  } catch (error) {
    throw new Error(`Hubo un error al recuperar los archivos: ${error}`);
  }
};

export default getFilesController;
