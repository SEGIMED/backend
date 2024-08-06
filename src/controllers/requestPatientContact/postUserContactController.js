import postUserContactHandler from "../../handlers/requestPatientContact/postUserContactHandler.js";

const postUserContactController = async (req, res) => {
  try {
    const body = req.body;
    const requestCreated = await postUserContactHandler(body);
    return res.status(201).json(requestCreated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default postUserContactController;
