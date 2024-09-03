import updateStatusSchedulingHandler from "../../handlers/scheduling/updateStatusSchedulingHandler.js";

const updateStatusSchedulingCtrl = async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).json({ message: "Falta el id de la cita" });
    }
    const { id } = req.query;

    const response = await updateStatusSchedulingHandler(id);
    res
      .status(200)
      .json({ message: "se ha modificado el estado de la cita", response });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default updateStatusSchedulingCtrl;
