import {PatientCardiovascularRisk} from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";


const createCardiovascularRiskHandler = async (body) => {
    const {patientId, riskId} = body;

    try {
        const newCardiovascularRisk = await PatientCardiovascularRisk.create(
            {
                patient: patientId,
                risk: riskId,
                physician: contextService.get('request:user').userId,
                registerTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z")
            }
        )
        return newCardiovascularRisk
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso creación.', 500)
    }
};

export default createCardiovascularRiskHandler;