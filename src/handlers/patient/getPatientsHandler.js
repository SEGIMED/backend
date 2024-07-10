import models from "../../databaseConfig.js";
import paginationUsersHandler from "../Pagination/paginationUsersHandler.js";;
import { mapPatients } from '../../mapper/patient/patientMapper.js';

const getPatientsHandler = async ({ limit, page }) => {
  try {
    //Type of role selection
    const queryOptions = {
      where:  {
        role:  3,
      },
      attributes: {
        exclude: ["password", "cellphone", "email"],
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
    };

    if (!limit && !page) {
      // Without pagination
      const getPatients = await models.User.findAll(queryOptions);
      return  mapPatients(getPatients);
    } else {
      // Pagination Logic
      return paginationUsersHandler({ page, limit, queryOptions });
    }
  } catch (error) {
    throw new Error("Error loading patients: " + error.message);
  }
};

export default getPatientsHandler;
