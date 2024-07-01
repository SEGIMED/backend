import userLoginHandler from "../../handlers/user/userLoginHandler.js";


const userLoginController = async (req, res) => {
    try {
        const loginResponse = await userLoginHandler(req.body);
        return res.status(200).json({
            msg: 'Iniciaste sesion correctamente.',
            authenticationDetails: loginResponse,
        });

    } catch (error) {
        return res.status(error.errorCode).json({error: error.message});
    }
}

export default userLoginController;