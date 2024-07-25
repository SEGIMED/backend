import { User } from "../databaseConfig.js";
import SegimedAPIError from "../error/SegimedAPIError.js";

export const verifyUser = async (idNumber) => {
  const user = await User.findOne({ where: { idNumber } });
  if (!user) {
    throw new SegimedAPIError("User not found", 404);
  } else {
    return true;
  }
};
