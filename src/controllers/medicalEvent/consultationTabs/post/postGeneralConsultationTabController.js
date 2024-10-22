import postGeneralConsultationTabHandler from "../../../../handlers/medicalEvent/consultationTabs/post/postGeneralConsultationTabHandler.js";

const postGeneralConsultationTabController = async (req, res) => {
  try {
    const { id } = req.query;
    const { consultationData, backgroundData } = req.body;

    const response = await postGeneralConsultationTabHandler({
      id,
      consultationData,
      backgroundData,
    });

    const values = Object.values(response).flatMap(Object.values);
    const allTrue = values.every((value) => value === true || value == null);
    if (allTrue) {
      return res.status(200).json("Datos actualizados correctamente.");
    } else {
      throw new Error("Algún campo no se pudo actualizar: " + values);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default postGeneralConsultationTabController;
