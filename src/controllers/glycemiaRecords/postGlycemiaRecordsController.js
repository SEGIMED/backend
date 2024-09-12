import postGlycemiaRecordsHandler from "../../handlers/glycemiaRecords/postGlycemiaRecordsHandler.js";

const postGlycemiaRecordsController = async (req, res) => {
  try {
    const { values, medicalEvent } = req.body
    const data = await postGlycemiaRecordsHandler(values, medicalEvent)
    return res.status(201).json(data)
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default postGlycemiaRecordsController;
