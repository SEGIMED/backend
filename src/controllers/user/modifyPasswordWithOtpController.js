import modifyPasswordWithOtpHandler from "../../handlers/user/modifyPasswordWithOtpHandler.js";
import modifyPasswordWithIdHandler from "../../handlers/user/modifyPasswordWithIdHandler.js";

const modifyPasswordWithOtpController = async (req, res) => {
    try {
        if(req.body.userEmail){
            const modifyUserPassword = await modifyPasswordWithOtpHandler(req.body);
            return res.status(200).json({
                msg: 'La contraseña ha sido modificada.',
                email: modifyUserPassword.email,
            });
        }

        if(req.body.idNumber){
            const modifyUserPassword = await modifyPasswordWithIdHandler(req.body);
            return res.status(200).json({
                msg: 'La contraseña ha sido modificada.',
                email: modifyUserPassword.email,
            });
        }

    } catch (error) {
        return res.status(error.errorCode).json({error: error.message});
    }
}

export default modifyPasswordWithOtpController;