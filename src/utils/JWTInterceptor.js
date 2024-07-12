import jwt from "jsonwebtoken";
import contextService from "request-context";


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
<<<<<<< HEAD
    "api/test"
=======
    "/api/getAllSchedule"
>>>>>>> e1f57df553fa7f938f9cd14536a8c21c278fdbf3
]

export const validateJWT = (req, res, next) => {
    const requestPath = req.originalUrl
    const shouldIntercept = excludedJWTPaths.indexOf(requestPath) === -1;
    if(shouldIntercept) {
        const requestJWT = req.get('token')
        try {
            // Validates JWT header
            const decodedToken = jwt.verify(requestJWT, process.env.ACCESS_TOKEN_SECRET)
            contextService.set('request:user',decodedToken )

        } catch (error) {
            //if token validation fails responds with 401 status and close the request
            return res.status(401).json({
                msg: 'The provided Authorization header is invalid'
            })
        }
    }
    next()
}