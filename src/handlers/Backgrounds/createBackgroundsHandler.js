import {Backgrounds} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";


const createBackgroundsHandler = async (body) => {
    const {
        patientId,
        surgicalBackground,
        pathologicBackground,
        nonPathologicBackground,
        familyBackground,
        pediatricBackground,
        pharmacologicalBackground,
        allergicBackground,
        vaccinationBackground,
        medicalEventId
    } = body;

    try {
        const now = moment()
   
        const [newBackground, createdBackground] = await Backgrounds.findOrCreate(
            {
                where:{
                    medicalEvent:medicalEventId
                },
                defaults:{
                patient:patientId,
                surgicalBackground,
                pathologicBackground,
                nonPathologicBackground,
                familyBackground,
                pediatricBackground,
                pharmacologicalBackground,
                allergicBackground,
                vaccinationBackground,
                timestamp:now.format("YYYY-MM-DD HH:mm:ss z"),
                medicalEvent:medicalEventId
                }
            }
        )
        if(createdBackground){
            return newBackground
        }else{
            return (`Ya existe un registro de antecedentes para el evento médico con id ${medicalEventId}`);
        }
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de registro.', 500)
    }
};

export default createBackgroundsHandler;

