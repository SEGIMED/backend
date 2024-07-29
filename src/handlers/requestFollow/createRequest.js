import { RequestFollow } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createRequestHandler = async (request) => {
    const { userSend, userReceptor, status } = request;
    if (!userSend || !userReceptor) {
        throw new SegimedAPIError("No se recibio la informacion necesaria", 400);
    }
    if (status && status !== 'pending') {
        throw new SegimedAPIError("El estado de la solicitud debe ser 'pending'", 400);
    }
    try {
        const requestFollow = await RequestFollow.create(request);
        return requestFollow;
    } catch (error) {
        throw new SegimedAPIError("Ocurrio un error con la operacion",500, error.message);
    }
}