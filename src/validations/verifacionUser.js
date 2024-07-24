import { User } from "../databaseConfig.js";

export const verifyUser = async (idNumber) => {
  const user = await User.findOne({ where: { idNumber } });
  if (!user) {
    return false;
  } else {
    return true;
  }
};
