import { RequestFollow } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createRequestHandler = async (request) => {
    try {
        const requestFollow = await RequestFollow.create(request);
        return requestFollow;
    } catch (error) {
        throw new SegimedAPIError("Ocurrio un error con la operacion",500, error.message);
    }
}