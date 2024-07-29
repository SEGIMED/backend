import { User } from "../../databaseConfig.js";


export const validateRequestFollow = async (req, res, next) => {
    const { userSend, userReceptor, status } = req.body;
    if (!userSend || !userReceptor) {
        return res.status(400).send("No se recibio la informacion necesaria");
    }
    if (status && status !== 'pending') {
        return res.status(400).send("El estado de la solicitud debe ser 'pending'");
    }
    const userReceptorExists = await User.findByPk(userReceptor);
    if (!userReceptorExists) {
        return res.status(400).send("El usuario receptor no existe");
    };
    next();
}