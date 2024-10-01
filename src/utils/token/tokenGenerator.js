import crypto from "crypto";
export const tokenGenerator = async () => {
  return crypto.randomBytes(2).toString("hex").toUpperCase();
};
