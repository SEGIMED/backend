import { getRequestHandler, getRequestByIdHandler } from "../../handlers/requestFollow/getRequest.js";


export const getRequestController = async (req, res) => {
    const { field, id } = req.query;
    if (field && id) {
        try {
            const requestFollow = await getRequestByIdHandler(field, id);
            res.status(200).send(requestFollow);
        } catch (error) {
            res.status(error.status).send(error.message);
        }
    } else {
        try {
            const requestFollow = await getRequestHandler();
            res.status(200).send(requestFollow);
        } catch (error) {
            res.status(error.status).send(error.message);
        };
    };
};