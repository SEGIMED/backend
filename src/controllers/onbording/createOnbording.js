import createOnbordingHandler from "../../handlers/onbording/createOnbordingHandler";

const createOnbording = async (req, res) => {
  try {
    const newOnbording = req.body;
    const onbording = await createOnbordingHandler(newOnbording);
    return res.status(200).json(onbording);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default createOnbording;
