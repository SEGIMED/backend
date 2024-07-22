/**
 * @api {path} /catCenterAttention/update Update
 * updateCatCenterAttHandler is a function that updates a center of attention
 */

import { updateCatCenterAttHandler } from "../../handlers/catCenterAtt/catCentAttHandlers.js";

export const updateCenterAttention = async (req, res) => {
  try {
    const data = await updateCatCenterAttHandler(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
