import getFilesHandler from "../../handlers/medicalHistory/getFilesHandler.js";

const getFilesController = async (req, res) => {
  try {
    const { userId, studyType, limit, page, scheduleId } = req.query;

    const files = await getFilesHandler(userId, studyType, limit, page, scheduleId);

    return res.status(200).json(files);
  } catch (error) {
    return res
      .status(500)
      .send(`Hubo un error al recuperar los archivos: ${error}`);
  }
};

export default getFilesController;
