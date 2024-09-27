import { deleteRequestHandler } from "../../handlers/requestTreatingPhysician/deleteTreatingPhysicianHandler.js";
export const deleteRequestController = async (req, res) => {
  try {
    const { id } = req.query;
    const message = await deleteRequestHandler(id);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};