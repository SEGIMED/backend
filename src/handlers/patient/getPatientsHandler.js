import models from "../../databaseConfig.js";
import paginationUsersHandler from "../Pagination/paginationUsersHandler.js";
import { mapPatients } from '../../mapper/patient/patientMapper.js';
import { Op } from "sequelize";

const getPatientsHandler = async ({ limit, page, name }) => {
  try {
    const queryOptions = {
      where: {
        role: 3,
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
            attributes: ['name'],
          },
        },
      ],
    };

    // Agregar filtros de búsqueda
    if (name) {
      const searchTerms = name.split(' ').filter(term => term.trim() !== '');
      queryOptions.where[Op.or] = searchTerms.map(term => ({
        [Op.or]: [
          { name: { [Op.iLike]: `%${term}%` } },
          { lastname: { [Op.iLike]: `%${term}%` } },
          { idNumber: { [Op.iLike]: `%${term}%` } }
        ]
      }));
    }

    // Sin paginación
    if (!limit && !page) {
      const getPatients = await models.User.findAll(queryOptions);
      return mapPatients(getPatients);
    } else {
      // Lógica de paginación
      return paginationUsersHandler({ page, limit, queryOptions });
    }
  } catch (error) {
    throw new Error("Error loading patients: " + error.message);
  }
};

export default getPatientsHandler;
