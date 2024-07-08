import models from '../../databaseConfig.js';
import { mapPatients } from '../../mapper/patient/patientMapper.js';

const getPatientsHandler = async () => {
  try {
    const getPatients = await models.User.findAll({
      where: {
        role: 3
      },
      attributes: {
        exclude: ['password', 'cellphone', 'email']
      },
      include: [
        {
          model: models.PatientPulmonaryHypertensionRisk,
          as: 'patientPulmonaryHypertensionRisks',
          include: {
            model: models.CatPulmonaryArterialHypertensionRisk,
            as: 'catHpRisk',
            attributes: ['name']
          }
        }
      ]
    });
    return mapPatients(getPatients);
  } catch (error) {
    throw new Error("Error loading patients: " + error.message);
  }
};

export default getPatientsHandler;
