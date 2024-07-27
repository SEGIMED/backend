import { RefreshToken } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
const REFRESH_TOKEN_EXPIRATION_MS = 15 * 24 * 60 * 60 * 1000; // 15 days
const refreshTokenCreationHandler = async ({ userId, refreshToken }) => {
  try {
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_MS);
    const [refreshTokenRecord, created] = await RefreshToken.findOrCreate({
      where: { userId },
      defaults: {
        token: refreshToken,
        expiresAt,
      },
    });

    if (!created) {
      refreshTokenRecord.expiresAt = expiresAt;
      refreshTokenRecord.token = refreshToken;
      await refreshTokenRecord.save();
    }
  } catch (error) {
    throw new SegimedAPIError("Error al refrescar el token", 400);
  }
};

export default refreshTokenCreationHandler;
