import { OneTimePassword } from "../databaseConfig.js";
import moment from "moment-timezone";
import bcrypt from "bcrypt";

export const generateOTP = async (user) => {
  const now = moment();
  const code = generateCode() + "";
  const hashedCode = await bcrypt.hash(code, 12);
  try {
    const userPendingOtps = await OneTimePassword.findAll({
      where: {
        redeemedTimestamp: null,
        user: user.id,
      },
    });
    // disables all previous pending otps before generating new one
    await userPendingOtps.forEach(async (otp) => {
      otp.redeemedTimestamp = new Date();
      await otp.save();
    });

    await OneTimePassword.create({
      temporaryCode: hashedCode,
      user: user.id,
      creationTimestamp: now.format("YYYY-MM-DD HH:mm:ss z"),
      expirationTimestamp: now
        .add(parseInt(process.env.OTP_EXPIRATION_TIME_MINUTES) || 30, "minutes")
        .format("YYYY-MM-DD HH:mm:ss z"),
    });
    return code;
  } catch (error) {
    throw error;
  }
};

function generateCode() {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const random = Math.floor(Math.random() * 10);
    otp = otp + random;
  }
  return otp;
}
