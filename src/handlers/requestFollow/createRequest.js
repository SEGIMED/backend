import { RequestFollow } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { validateRequestFollow } from "../../validations/validateRequestFollow.js";

export const createRequestHandler = async (request) => {
    const validate = validateRequestFollow(request);
    if (validate) {
        throw new SegimedAPIError("Error en la validacion", 400, validate);
    }
    try {  
        const requestFollow = await RequestFollow.create(request);
        return requestFollow;
    } catch (error) {
        throw new SegimedAPIError("Ocurrio un error con la operacion",500, error.message);
    }
}