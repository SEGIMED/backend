import models from "../../../databaseConfig.js";

const deletePhysicianFileHandler = async ({ fileId }) => {
  try {
    const file = await models.PhysicianFiles.findOne({ where: { id: fileId } });
    if (!file) throw new Error("Archivo no encontrado");

    // Eliminar el archivo de la base de datos
    await models.PhysicianFiles.destroy({ where: { id: fileId } });

    return { message: "Archivo eliminado correctamente" };
  } catch (error) {
    throw new Error(`Error al eliminar el archivo: ${error.message}`);
  }
};

export default deletePhysicianFileHandler;
