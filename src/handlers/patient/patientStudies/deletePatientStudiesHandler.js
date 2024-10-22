import models from "../../../databaseConfig.js";

const deletePatientStudiesHandler = async ({ id }) => {
  try {
    const file = await models.PatientStudies.findByPk(id);
    if (!file) throw new Error("El archivo no existe.");
    await models.PatientStudies.destroy({ where: { id } });

    return { message: "Archivo eliminado con éxito" };
  } catch (error) {
    throw new Error("No se pudo borrar el archivo: " + error);
  }
};

export default deletePatientStudiesHandler;
