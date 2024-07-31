import contextService from "request-context";
import { verifyAndRefreshToken } from "./JWTUtils.js";

const excludedJWTPaths = [
  "/api/patientsfilter",
  "/api/user/login",
  "/api/user/recover-password",
  "/api/user/modify-password",
  "/api/user/register-user",
  "/api/user/validate-email",
  "/api/doc/favicon-32x32.png",
  "/api/doc/favicon-16x16.png",
  "/api/doc/",
  "/api/doc/swagger-ui-init.js",
  "/api/doc/swagger-ui-standalone-preset.js",
  "/api/doc/swagger-ui-bundle.js",
  "/api/doc/swagger-ui.css",
];

export const validateJWT = async (req, res, next) => {
  //Lo necesito para la ruta en cuestion??
  const requestPath = req.originalUrl;
  //Si no se encuentra en el exclude devuelve true porque indexOf retorna -1
  const shouldIntercept = excludedJWTPaths.indexOf(requestPath) === -1;

  //Si es true se entra al if
  if (shouldIntercept) {
    // el token debería traer el access-token
    const requestJWT = req.get("token");
    const refreshToken = req.get("x-refresh-token");
    if (!requestJWT) {
      return res.status(401).json({ msg: "Invalid access token" });
    }

    try {
      const { newAccessToken, decodedToken } = await verifyAndRefreshToken(
        requestJWT,
        refreshToken
      );
      if (newAccessToken) {
        res.setHeader("token", newAccessToken);
      }
      contextService.set("request:user", decodedToken);
      return next();
    } catch (error) {
      console.error(error.message);
      const statusCode = error.message.includes("expired") ? 403 : 401;
      return res.status(statusCode).json({ msg: error.message });
    }
  } else {
    next();
  }
};
