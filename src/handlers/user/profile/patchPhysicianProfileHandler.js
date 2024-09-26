import models from "../../../databaseConfig";

const patchPhysicianProfileHandler = async ({ id, userData }) => {
  try {
    const user = await models.User.findByPk(id);
    if (!user) throw new Error("No se encontró un usuario.");
    const onboarding = await models.PhysicianOnboarding.findOne({
        where:{
            idPhysician: id
        }
    })
    
    user.update(userData)

    return "Se actualizaron los datos correctamente."
  } catch (error) {
    throw new Error(
      "Ocurrió un error al actualizar el perfil: " + error.message
    );
  }
};
export default patchPhysicianProfileHandler;
