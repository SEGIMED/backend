/**
 * @swagger
 * /catCenterAtt:
 *  get:
 *   summary: Get all centers of attention
 *  tags: [CatCenterAttention]
 * responses:
 *   200:
 *   description: Centers of attention obtained
 *  content:
 *   application/json:
 *   schema:
 *   type: array
 *  items:
 *  type: object
 * properties:
 * id:
 * type: integer
 * description: Center of attention id
 * name:
 * type: string
 * description: Center of attention name
 * address:
 * type: string
 * description: Center of attention address
 * phone:
 * 'type': string
 * description: Center of attention phone
 * email:
 * type: string
 * description: Center of attention email
 * city:
 * type: string
 */

import { getAllCatCenterAttHandler } from "../../handlers/catCenterAtt/catCentAttHandlers.js";

export const getCenterAtt = async (req, res) => {
  try {
    const data = await getAllCatCenterAttHandler();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
