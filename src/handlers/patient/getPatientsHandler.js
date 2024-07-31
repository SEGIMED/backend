import models, { PhysicianFavoritePatient } from "../../databaseConfig.js";
import paginationUsersHandler from "../Pagination/paginationUsersHandler.js";
import { mapPatients } from "../../mapper/patient/patientMapper.js";
import { Op } from "sequelize";

const getPatientsHandler = async (
  { limit, page, name, risk, physicianId, treating },
  onlyFavorites
) => {
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
          as: "patientPulmonaryHypertensionRisks",
          include: {
            model: models.CatPulmonaryArterialHypertensionRisk,
            as: "catHpRisk",
            attributes: ["name"],
            ...(risk ? { where: { name: { [Op.iLike]: `%${risk}%` } } } : {}),
          },
        },
        // Incluir PhysicianFavoritePatient solo si physicianId está definido
        physicianId && {
          model: PhysicianFavoritePatient,
          as: "favorites",
          attributes: ["physicianId", "favoritePatient"],
          where: {
            physicianId: physicianId,
          },
          required: false, // Allow for patients who are not favorites
        },
      ].filter(Boolean), // Elimina cualquier valor false de la lista de includes
    };

    // Agregar filtros de búsqueda
    if (name) {
      const searchTerms = name.split(" ").filter((term) => term.trim() !== "");
      queryOptions.where[Op.or] = searchTerms.map((term) => ({
        [Op.or]: [
          { name: { [Op.iLike]: `%${term}%` } },
          { lastname: { [Op.iLike]: `%${term}%` } },
          { idNumber: { [Op.iLike]: `%${term}%` } },
        ],
      }));
    }

    // Agregar filtro para solo favoritos si onlyFavorites es "true"
    if (onlyFavorites && physicianId) {
      queryOptions.include.push({
        model: PhysicianFavoritePatient,
        as: "favorites",
        attributes: ["physicianId", "favoritePatient"],
        where: {
          physicianId: physicianId,
        },
        required: true, // Asegura que solo se incluyan pacientes que son favoritos
      });
    }

    if (physicianId && treating) {
      queryOptions.where = {
        role: 3,
        treatingPhysician: physicianId,
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

// import models, { PhysicianFavoritePatient } from "../../databaseConfig.js";
// import paginationUsersHandler from "../Pagination/paginationUsersHandler.js";
// import { mapPatients} from '../../mapper/patient/patientMapper.js';
// import { Op } from "sequelize";

// const getPatientsHandler = async ({ limit, page, name, risk, physicianId, onlyFavorites }) => {
//   try {
//     const queryOptions = {
//       where: {
//         role: 3,
//       },
//       attributes: {
//         exclude: ["password", "cellphone", "email"],
//       },
//       include: [
//         {
//           model: models.PatientPulmonaryHypertensionRisk,
//           as: 'patientPulmonaryHypertensionRisks',
//           include: {
//             model: models.CatPulmonaryArterialHypertensionRisk,
//             as: 'catHpRisk',
//             attributes: ['name'],
//             ...(risk ? { where: { name: { [Op.iLike]: `%${risk}%` } } } : {}),
//           },
//         },
//       ],
//     };

//     // Incluir PhysicianFavoritePatient solo si physicianId está definido
//     if (physicianId) {
//       queryOptions.include.push({
//         model: PhysicianFavoritePatient,
//         as: "favorites",
//         attributes: ["physicianId", "favoritePatient"],
//         where: {
//           physicianId: physicianId
//         },
//         required: false
//       });
//     }

//     // Agregar filtros de búsqueda
//     if (name) {
//       const searchTerms = name.split(' ').filter(term => term.trim() !== '');
//       queryOptions.where[Op.or] = searchTerms.map(term => ({
//         [Op.or]: [
//           { name: { [Op.iLike]: `%${term}%` } },
//           { lastname: { [Op.iLike]: `%${term}%` } },
//           { idNumber: { [Op.iLike]: `%${term}%` } }
//         ]
//       }));
//     }

//     // Sin paginación
//     if (!limit && !page) {
//       const getPatients = await models.User.findAll(queryOptions);
//       return mapPatients(getPatients, (onlyFavorites=="true"));
//     } else {
//       // Lógica de paginación
//       return paginationUsersHandler({ page, limit, queryOptions});
//     }
//   } catch (error) {
//     throw new Error("Error loading patients: " + error.message);
//   }
// };

// export default getPatientsHandler;
