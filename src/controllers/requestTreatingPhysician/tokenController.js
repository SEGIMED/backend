import tokenHandler from "../../handlers/requestTreatingPhysician/tokenHandler.js";

const tokenController = async (req, res) => {
  try {
    const { id } = req.query;
    const token = await tokenHandler({ id });
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export default tokenController;
