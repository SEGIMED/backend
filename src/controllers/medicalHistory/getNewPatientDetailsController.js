import getNewPatientDetailsHandler from "../../handlers/medicalHistory/getNewPatientDetailsHandler.js";


const getNewPatientDetailsController = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await getNewPatientDetailsHandler(id);
    return res.status(200).json(data);
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar los datos del paciente: " + error
    );
  }
};

export default getNewPatientDetailsController;
