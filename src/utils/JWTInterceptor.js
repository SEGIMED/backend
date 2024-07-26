import jwt from "jsonwebtoken";
import contextService from "request-context";
import { RefreshToken } from "../databaseConfig.js";

const excludedJWTPaths = [
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

        //el token debería traer el access-token
        const requestJWT = req.get('token');
        try {
            console.log(requestJWT)
            // Validate the access token
            const decodedToken = jwt.verify(requestJWT, process.env.ACCESS_TOKEN_SECRET)
            console.log("ACSADFSVCSVCVSD")
            contextService.set('request:user',decodedToken )
            next();
        } catch (error) {
            console.log(error)
            //Si llega acá es porque no se pudo validar
            if (error.name === 'TokenExpiredError') {
                // Access token no valido, asi que busco el refresh token
                const refreshToken = req.get('x-refresh-token');

                //Si no se mandó tira este error
                if (!refreshToken) {
                    return res.status(401).json({ msg: 'Refresh token is missing' });
                }

                try {
                    //Se guarda en una variable lo que devuelve el llamado de busqueda del refresh token en
                    //el modelo del backend
                    const refreshTokenRecord = await RefreshToken.findOne({ where: { token: refreshToken } });
                    if (!refreshTokenRecord || refreshTokenRecord.expiresAt < new Date()) {
                        return res.status(403).json({ msg: 'Refresh token is invalid or expired' });
                    }
                    //Se revisa si el refresh token es valido
                    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

                    //  
                
                    const { accessToken, iat, exp, ...newPayload } = decodedRefreshToken;
                    console.log('New payload for access token:', newPayload);
                    const newAccessToken = jwt.sign(newPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // 10 seconds for testing
                    //console.log('New access token generated:', newAccessToken);
                    
                    res.setHeader('token', newAccessToken);
                    contextService.set('request:user', decodedRefreshToken);
                    next();
                } catch (refreshError) {
                    console.log(refreshError)
                    return res.status(403).json({ msg: 'Invalid refresh token' });
                }
            } else {
                return res.status(401).json({ msg: 'Invalid access token' });
            }
        }
    } else {
        next();
    }
};