import getPainMapHandler from "../../handlers/medicalHistory/getPainMapHandler.js";

const getPainMapController = async (req, res) => {
  try {
    const { patientId, page, limit } = req.query;
    const data = await getPainMapHandler(patientId, page, limit);
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).send({message:`Hubo un error al recuperar el mapa de dolor: ${error.message}`})
  }
};

export default getPainMapController;