import { OneTimePassword } from "../databaseConfig.js";
import moment from "moment-timezone";
import bcrypt from "bcrypt";

export const generateOTP = async (user, transaction) => {
  const now = moment();
  const code = generateCode() + "";
  const hashedCode = await bcrypt.hash(code, 12);

  try {
    // Encontrar los OTPs pendientes (no redimidos) del usuario dentro de la transacción
    const userPendingOtps = await OneTimePassword.findAll({
      where: {
        redeemedTimestamp: null,
        user: user.id,
      },
      transaction, // Asegurar que esto esté dentro de la transacción
    });

    // Deshabilitar todos los OTPs pendientes antes de generar uno nuevo
    for (const otp of userPendingOtps) {
      otp.redeemedTimestamp = new Date();
      await otp.save({ transaction }); // Aseguramos que el save esté dentro de la transacción
    }

    // Crear un nuevo OTP dentro de la transacción
    await OneTimePassword.create(
      {
        temporaryCode: hashedCode,
        user: user.id,
        creationTimestamp: now.format("YYYY-MM-DD HH:mm:ss z"),
        expirationTimestamp: now
          .add(
            parseInt(process.env.OTP_EXPIRATION_TIME_MINUTES) || 30,
            "minutes"
          )
          .format("YYYY-MM-DD HH:mm:ss z"),
      },
      { transaction } // Pasamos la transacción aquí también
    );

    return code; // Retornar el OTP original (sin el hash)
  } catch (error) {
    throw error; // Manejar errores
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
