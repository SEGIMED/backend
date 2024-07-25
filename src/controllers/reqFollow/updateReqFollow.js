import { updateRequestFollowHandler } from "../../handlers/reqFollow/reqFollowHandlers.js";

const updateReqFollow = async (req, res) => {
    const { id } = req.query;
    const { status } = req.body;
    const statusFormat = status.toLowerCase().trim();
  try {
    const requestFollow = await updateRequestFollowHandler(id, statusFormat);
    res.status(200).json(requestFollow);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default updateReqFollow;