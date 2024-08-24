import getNewPatientDetailsHandler from "../../handlers/medicalHistory/getNewPatientDetailsHandler.js";

const getNewPatientDetailsController = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await getNewPatientDetailsHandler(id);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .send("Ocurrió un error al recuperar los datos del paciente: " + error);
  }
};

export default getNewPatientDetailsController;
