import models from "../../../databaseConfig.js";

const getPhysicianFilesHandler = async ({ physicianId }) => {
  try {
    // Busca todos los archivos asociados al physicianId
    const files = await models.PhysicianFiles.findAll({
      where: { physicianId },
      attributes: ["id", "fileType", "url"],
    });

    if (!files || files.length === 0) {
      throw new Error("No se encontraron archivos para este médico");
    }

    return { files };
  } catch (error) {
    throw new Error(`Error al obtener los archivos: ${error.message}`);
  }
};

export default getPhysicianFilesHandler;
