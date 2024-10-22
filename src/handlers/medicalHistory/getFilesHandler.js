import models from "../../databaseConfig.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getFilesHandler = async (userId, studyType, limit, page, scheduleId) => {
  try {
    if (!userId) {
      throw new Error("El id de usuario es obligatorio");
    }

    // Construimos el query base para el usuario
    const query = { userId };

    // Si hay studyType, lo agregamos al query
    if (studyType) {
      query.studyType = studyType;
    }

    // Si hay scheduleId, lo agregamos al query
    if (scheduleId) {
      query.schedule = scheduleId;
    }

    // Consulta a la base de datos con las condiciones del query
    const files = await models.PatientStudies.findAll({
      where: query,
      attributes: {
        exclude: ["userId"],
      },
      include: {
        model: models.CatStudyType,
        as: "CatStudyType",
        attributes: ["name"],
      },
    });

    // Si hay paginación, manejamos los resultados con paginación
    if (limit && page) {
      const pagination = universalPaginationHandler(files, page, limit);
      return pagination;
    }

    // Retornamos los archivos sin paginación si no se especifica límite o página
    return files;
  } catch (error) {
    throw new Error(error.message || "Error al obtener los archivos");
  }
};

export default getFilesHandler;