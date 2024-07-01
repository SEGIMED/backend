import otpMailValidationHandler from "../../handlers/user/otpMailValidationHandler.js";

const otpMailValidationController = async (req, res) => {
    try {
        const validatedUser = await otpMailValidationHandler(req.body);
        return res.status(200).json({
            msg: 'La verificación del correo electrónico se ha realizado correctamente.',
            verifiedUser: validatedUser
        });

    } catch (error) {
        return res.status(error.errorCode).json({error: error.message});
    }
}

export default otpMailValidationController;