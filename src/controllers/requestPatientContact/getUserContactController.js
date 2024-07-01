import getUserContactHandler from "../../handlers/requestPatientContact/getUserContactHandler.js";

const getUserContactController = async (req, res) => {
  try {
    const { id } = req.params;

    const requesUserContact = await getUserContactHandler(id);

    return res.status(200).json(requesUserContact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getUserContactController;
