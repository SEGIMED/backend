import contextService from "request-context";
import models from "../databaseConfig.js";
const verificationDataPhysicians = async (req, res) => {
  const { physicianId } = req.query;
  const user = contextService.get("request:user");
  try {
    if (!physicianId) throw new Error("El ID del médico es requerido.");
    if (user.userId !== 18)
      throw new Error("No estás habilitado para autorizar un nuevo médico.");
    const physician = await models.PhysicianOnboarding.findOne({
      where: {
        idPhysician: physicianId,
      },
    });
    if (!physician) throw new Error("No existe el médico que quiere validar.");
    if (physician.verified) throw new Error("El médico ya está verificado.");

    physician.verified = true;
    await physician.save();
    return res.status(200).json({ message: "Médico verificado exitosamente." });
  } catch (error) {
    return res
      .status(500)
      .json("Ocurrió un error en el procesa: " + error.message);
  }
};
export default verificationDataPhysicians;
