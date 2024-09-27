import { getRequestHandler } from "../../handlers/requestTreatingPhysician/getTreatingPhysicianHandler.js";
export const getRequestController = async (req, res) => {
  try {
    const { status, isActive, senderType } = req.query;
    const message = await getRequestHandler({ status, isActive, senderType });
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};
