import getAnamnesisHandler from "../../../handlers/medicalHistory/Anamnesis/getAnamnesis.js";

const getAnamnesisCtrl = async (req, res) => {
  try {
    const { userId, physicianId, medicalSpecialtyId, page, limit } = req.query;
    const response = await getAnamnesisHandler({
      patientId:userId,
      physicianId,
      medicalSpecialtyId,
      page,
      limit,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getAnamnesisCtrl;
