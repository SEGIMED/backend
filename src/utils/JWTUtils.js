import jwt from "jsonwebtoken";
import { RefreshToken } from "../databaseConfig.js";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, JWT_EXPIRATION_SECONDS } =
  process.env;

// Function to verify and refresh JWT
export const verifyAndRefreshToken = async (token, refreshToken) => {
  try {
    console.log("Validating token");
    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return { decodedToken };
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.message === "jwt expired" ||
      error.message === "invalid token"
    ) {
      if (!refreshToken) {
        throw new Error("Refresh token is missing");
      }

      const refreshTokenRecord = await RefreshToken.findOne({
        where: { token: refreshToken },
      });

      if (!refreshTokenRecord || refreshTokenRecord.expiresAt < new Date()) {
        throw new Error("Refresh token is invalid or expired");
      }
      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          REFRESH_TOKEN_SECRET
        );
        const { iat, exp, ...newPayload } = decodedRefreshToken;

        const newAccessToken = jwt.sign(newPayload, ACCESS_TOKEN_SECRET, {
          expiresIn: `${JWT_EXPIRATION_SECONDS || "900"}s`,
        });

        return { newAccessToken, decodedToken: newPayload };
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          throw new Error("Refresh token expired");
        }
        throw new Error("Invalid refresh token");
      }
    } else {
      throw new Error("Invalid access token");
    }
  }
};
