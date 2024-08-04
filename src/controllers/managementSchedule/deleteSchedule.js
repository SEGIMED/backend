import { DoctorSchedule } from "../../databaseConfig.js";

const deleteSchedule = async (req, res) => {
  const { id } = req.query;
  try {
    await DoctorSchedule.destroy({
      where: {
        doctor_id: id,
      },
    });
    res.status(200).json({ message: "registro eliminado con exito" });
  } catch (error) {
    res.status(404).json({ msj: error.message });
  }
};

export default deleteSchedule;
