import createOnbordingHandler from "../../handlers/onbording/createOnbordingHandler.js";

const createOnbordingController = async (req, res) => {
  const { userId } = req.query;
  try {
    const newOnbording = req.body;
    const onbording = await createOnbordingHandler(newOnbording, userId);
    return res.status(200).json(onbording);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default createOnbordingController;
