import models from "../../../databaseConfig.js";
import createOnbordingHandler from "../../onbording/createOnbordingHandler.js";

const patchPatientProfileHandler = async ({ id, userData, onboardingData }) => {
  try {
    const existingUserWithEmail = await models.User.findOne({
      where: { email: userData.email },
      attributes: ["id"],
    });
    if (existingUserWithEmail && existingUserWithEmail.id !== id) {
      throw new Error("Este correo ya está en uso por otro usuario.");
    }
    const existingUserWithPhone = await models.User.findOne({
      where: { cellphone: userData.cellphone },
      attributes: ["id"],
    });

    if (existingUserWithPhone && existingUserWithPhone.id !== id) {
      throw new Error(
        "Este número de celular ya está en uso por otro usuario."
      );
    }
    const user = await models.User.findByPk(id);
    if (!user) throw new Error("No se encontró un usuario.");
    await user.update(userData);
    await createOnbordingHandler(onboardingData, id);
    return "Datos actualizados correctamente.";
  } catch (error) {
    console.log(error);
    throw new Error(
      "Ocurrió un error al actualizar los datos del perfil: " + error.message
    );
  }
};

export default patchPatientProfileHandler;
