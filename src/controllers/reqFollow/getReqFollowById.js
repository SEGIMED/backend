import { getRequestFollowByIdHandler } from "../../handlers/reqFollow/reqFollowHandlers.js";

const getReqFollowById = async (req, res) => {
  const { id } = req.params;
  try {
    const requestFollow = await getRequestFollowByIdHandler(id);
    res.status(200).json(requestFollow);
  } catch (error) {
    res.status(500).json(error);
  }
};
export default getReqFollowById;