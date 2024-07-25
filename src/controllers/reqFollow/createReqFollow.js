/**
 * @swagger
 * /reqFollow:
 *  post:
 *  summary: Create a request follow
 *  requestBody:
 *  required: true
 *  content:
 *  application/json:
 *  schema:
 *  type: object
 * properties:
 * userSend:
 * type: integer
 * userReceptor:
 * type: integer
 * required:
 * - userSend
 * - userReceptor
 * responses:
 *  200:
 */
import { createRequestFollowHandler } from "../../handlers/reqFollow/reqFollowHandlers.js";

const createReqFollow = async (req, res) => {
  const { userSend, userReceptor } = req.body;
  try {
    const requestFollow = await createRequestFollowHandler(
      userSend,
      userReceptor
    );
    res.status(200).json(requestFollow);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default createReqFollow;
