import { createRequestHandler } from "../../handlers/requestFollow/createRequest.js";


export const createRequestController = async (req, res) => {
    try {
        const requestFollow = await createRequestHandler(req.body);
        res.status(200).send(requestFollow);
    } catch (error) {
        res.status(error.status).send(error.message); 
    }
};