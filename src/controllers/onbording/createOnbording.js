import createOnboardingHandler from "../../handlers/onbording/createOnbordingHandler.js";

const createOnboardingController = async (req, res) => {
  const { id } = req.query;
  try {
    const newOnbording = req.body;
    const onbording = await createOnboardingHandler(newOnbording, id);
    return res.status(200).json(onbording);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default createOnboardingController;
