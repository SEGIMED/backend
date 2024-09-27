import { createRequestHandler } from "../../handlers/requestTreatingPhysician/requestTreatingPhysicianHandler.js";
export const createRequestController = async (req, res) => {
  try {
    const { physicianId, patientId } = req.body;
    const newRequest = await createRequestHandler(physicianId, patientId);
    return res.status(201).json(newRequest);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};