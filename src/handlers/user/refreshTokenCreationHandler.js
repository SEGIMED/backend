import { RefreshToken } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const {REFRESH_TOKEN_EXPIRATION_DAYS} = process.env

const refreshTokenCreationHandler = async ({userId, refreshToken}) => {
  try {
    const [refreshTokenRecord, created] = await RefreshToken.findOrCreate({
      where: { userId },
      defaults: {
        token: refreshToken,
        expiresAt: new Date(
          Date.now() + REFRESH_TOKEN_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
        ),
      },
    });

    if (!created) {
      refreshTokenRecord.expiresAt = new Date(
        Date.now() + REFRESH_TOKEN_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
      );
      refreshTokenRecord.token = refreshToken
      await refreshTokenRecord.save();
    }
  } catch (error) {
    throw new SegimedAPIError("Error al refrescar el token", 400)
  }
};

export default refreshTokenCreationHandler