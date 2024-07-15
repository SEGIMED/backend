import models from "../../databaseConfig.js";
import paginationUsersHandler from "../Pagination/paginationUsersHandler.js";
import { mapPatients } from '../../mapper/patient/patientMapper.js';
import { Op } from "sequelize";

const getPatientsHandler = async ({ name, lastname, idNumber, limit, page }) => {
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
      queryOptions.where.name = {
        [Op.iLike]: `%${name}%`, // Cambia aquí
      };
    }
    if (lastname) {
      queryOptions.where.lastname = {
        [Op.iLike]: `%${lastname}%`, // Cambia aquí
      };
    }
    if (idNumber) {
      queryOptions.where.idNumber = {
        [Op.eq]: idNumber, // Cambia aquí
      };
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

