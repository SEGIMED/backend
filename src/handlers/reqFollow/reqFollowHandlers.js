import { RequestFollow } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { verifyUser } from "../../validations/verifacionUser.js";

export const createRequestFollowHandler = async (userSend, userReceptor) => {
  try {
    const verify = await verifyUser(userReceptor);
    if (!verify) {
      throw new SegimedAPIError("User not found", 404);
    }
    const requestFollow = await RequestFollow.create({
      userSend,
      userReceptor,
    });
    return requestFollow;
  } catch (error) {
    throw new SegimedAPIError("Error creating request follow", 500, error);
  }
};

export const getRequestFollowByIdHandler = async (id) => {
  try {
    const requestFollow = await RequestFollow.findAll({ where: { id } });
    return requestFollow;
  } catch (error) {
    throw new SegimedAPIError("Error getting request follow", 500, error);
  }
};
export const updateRequestFollowHandler = async (id, status) => {
  try {
    const requestFollow = await RequestFollow.update(
      { status },
      { where: { id } }
    );
    res.status(200).json(requestFollow);
  } catch (error) {
    throw new SegimedAPIError("Error updating request follow", 500, error);
  }
};
