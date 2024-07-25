import recoverPasswordHandler from "../../handlers/user/recoverPasswordHandler.js";

const recoverPasswordController = async (req, res) => {
    try {
        const recoverUserPassword = await recoverPasswordHandler(req.body);
        return res.status(200).json({
            msg: 'Se ha enviado un correo para recuperar la contraseña.',
            id: recoverUserPassword.id,
        });

    } catch (error) {
        console.log(error.message)
        return res.status(error.errorCode).json({error: error.message});
    }
}

export default recoverPasswordController;