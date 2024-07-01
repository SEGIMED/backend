import {AnthropometricDetails} from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment-timezone";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const createAnthropometricDetailHandler = async (body) => {
    const {patientId, measure, measureType} = body;

    try {
        const newAnthropometricDetail = await AnthropometricDetails.create(
            {
                patient: patientId,
                measure,
                measureSource: contextService.get('request:user').userId,
                measureType,
                measureDate: moment().format("YYYY-MM-DD HH:mm:ss z")
            }
        )
        return newAnthropometricDetail
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de registro.', 500)
    }
};

export default createAnthropometricDetailHandler;