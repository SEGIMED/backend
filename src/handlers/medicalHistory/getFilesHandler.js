import models from "../../databaseConfig.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";
const getFilesHandler = async (userId, studyType, limit, page) => {
  try {
    if (!userId) {
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

    if (limit && page) {
      const pagination = universalPaginationHandler( files, page, limit);
      return pagination;
    }

    return files;
  } catch (error) {
    throw new Error(error);
  }
};

export default getFilesHandler;
