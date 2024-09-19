import postBackgroundTabHandler from "../../../../handlers/medicalEvent/consultationTabs/post/postBackgroundTabHandler.js";

const postBackgroundTabController = async (req, res) => {
  try {
    const { id } = req.query;
    const { risks, hpGroupIds } = req.body;
    const response = await postBackgroundTabHandler({ id, risks, hpGroupIds });
    
    const anyFailed = Object.values(response).some((value) => value === false);

    if (anyFailed) {
      throw new Error("Algunas actualizaciones fallaron.");
    }
    return res
      .status(200)
      .json({ message: "Datos actualizados correctamente." });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default postBackgroundTabController;
