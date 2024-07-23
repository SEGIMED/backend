import {PatientPulmonaryHypertensionGroup, PatientPulmonaryHypertensionGroupMapping} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const updatePatientHpGroupHandler = async (body) => {
    const {patientGroupId, hpGroups} = body
    //TODO Validations for patient and hpGroups range between 1-5
    try {
    //It destroys the previous record
        await PatientPulmonaryHypertensionGroupMapping.destroy(
        {
            where:{
                patientGroupId: patientGroupId
            }
        }
        )
    //It creates the new record
        const mappingPromises = hpGroups.map(async (groupId) => {
            return await PatientPulmonaryHypertensionGroupMapping.create({
              patientGroupId: patientGroupId,
              groupId: groupId
            });
          });
      
          const createdMappings = await Promise.all(mappingPromises);
        return createdMappings
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de actualización.', 500)
    }
};

export default updatePatientHpGroupHandler;