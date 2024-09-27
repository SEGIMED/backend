import models from "../../../databaseConfig.js";
import { createOnbPhysician } from "../../onbording/createOnbPhysician.js";
const patchPhysicianProfileHandler = async ({
  id,
  userData,
  onboardingData,
}) => {
  try {
    const user = await models.User.findByPk(id);
    if (!user) throw new Error("No se encontró un usuario.");
    await user.update(userData);
    await createOnbPhysician(onboardingData, id);
    return "Se actualizaron los datos correctamente.";
  } catch (error) {
    throw new Error(
      "Ocurrió un error al actualizar el perfil: " + error.message
    );
  }
};
export default patchPhysicianProfileHandler;
