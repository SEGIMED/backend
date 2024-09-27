import { updateTreatingPhysicianHandler } from "../../handlers/requestTreatingPhysician/updateTreatingPhysicianHandler.js";
const updateTreatingPhysicianController = async (req, res) => {
  try {
    const request = await updateTreatingPhysicianHandler(req.body);
    res.status(200).json(request);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
export default updateTreatingPhysicianController;
