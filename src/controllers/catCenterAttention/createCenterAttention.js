/**
 * createCatCenterAttHandler is a function that creates a center of attention
 */
import { createCatCenterAttHandler } from "../../handlers/catCenterAtt/catCentAttHandlers.js";

export const createCenterAttention = async (req, res) => {
  try {
    const data = await createCatCenterAttHandler(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
