/**
 * @api {get} /center-att Get All Center Attention
 * getAllCatCenterAttHandler is a function that returns all center of attention
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
