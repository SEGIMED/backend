/**
 * @swagger
 * /catCenterAtt:
 * put:
 * summary: Update a center of attention
 * tags: [CatCenterAttention]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
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
 * type: string
 * description: Center of attention phone
 * email:
 * type: string
 * description: Center of attention email
 * city:
 * type: string
 * responses:
 * 200:
 */

import { updateCatCenterAttHandler } from "../../handlers/catCenterAtt/catCentAttHandlers.js";

export const updateCenterAttention = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await updateCatCenterAttHandler(req.body, id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
