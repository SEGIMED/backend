import models from "../../databaseConfig.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";
const getFilesHandler = async (userId, studyType) => {
  try {
    if (userId) {
      throw new Error("El id de usuario es obligatorio");
    }

    const query = { userId };

    if (studyType) {
      query.studyType = studyType;
    }

    const files = await models.PatientStudies.findAll({
      where: query,
      attributes: {
        exclude: ["userId"],
      },
      include: {
        model: models.CatStudyType,
        as: "CatStudyTypePatientStudies",
        attributes: ["name"],
      },
    });

    const pagination = universalPaginationHandler();
    return files;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default getFilesHandler;
