import {PatientPulmonaryHypertensionGroup, PatientPulmonaryHypertensionGroupMapping} from "../../databaseConfig.js";
import moment from "moment-timezone";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const createPatientHpGroupHandler = async (body) => {
 
    const {patientId, physicianId, hpGroups} = body;

    //TODO Validations for patient and hpGroups range between 1-5
    try {
        const newHpGroup = await PatientPulmonaryHypertensionGroup.create(
            {
                patient: patientId,
                physician: physicianId,
                timestamp: moment().format("YYYY-MM-DD HH:mm:ss z")
            }
        )
        const mappingPromises = hpGroups.map(async (groupId) => {
            return await PatientPulmonaryHypertensionGroupMapping.create({
              patientGroupId: newHpGroup.id,
              groupId: groupId
            });
          });
      
          const createdMappings = await Promise.all(mappingPromises);

          return ({newHpGroup, createdMappings})
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de creación.', 500)
    }
};

export default createPatientHpGroupHandler;