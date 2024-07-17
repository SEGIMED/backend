import getPatientsHandler from "../../handlers/patient/getPatientsHandler.js";

const getPatientsController = async (req, res) => {
  const { limit, page, name, lastname, idNumber } = req.query;
  console.log( limit, page, name, lastname, idNumber );
  try {
    const users = await getPatientsHandler({ limit, page, name, lastname, idNumber });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getPatientsController;

