import { Op } from "sequelize";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment";
import { SociodemographicDetails, User } from "../../databaseConfig.js";

const getAgeRangesHandler = async (physicianId) => {
    try {
        const today = moment().startOf('day');

        // Configuración del filtro para la consulta
        const whereClause = {
            dateOfDeathReport: {
                [Op.is]: null,
            },
        };

        const includeClause = [];

        // Si physicianId está definido, agregar la condición de filtro
        if (physicianId) {
            whereClause['$patient_user.treating_physician$'] = physicianId;
            includeClause.push({
                model: User,
                as: 'patient_user',
                attributes: [],
            });
        }

        // Obtener las fechas de nacimiento
        const birthDates = await SociodemographicDetails.findAll({
            attributes: ['birth_date'],
            where: whereClause,
            include: includeClause,
        });

        // Extraer las fechas de nacimiento y convertirlas en edades
        const agesArray = birthDates.map(instance => {
            const birthDate = moment(instance.dataValues.birth_date);
            const age = today.diff(birthDate, 'years');
            return age;
        });

        const ageCounts = Array(20).fill(0); // Array para 20 rangos de 5 años (0-95+)
        agesArray.forEach(age => {
            if (age >= 0 && age < 100) {
                const index = Math.floor(age / 5);
                ageCounts[index] += 1;
            } else if (age >= 100) {
                ageCounts[19] += 1; // 95+
            }
        });

        const ageRanges = {}; // Preparar el JSON
        for (let i = 0; i < ageCounts.length - 1; i++) {
            ageRanges[`${i * 5}to${i * 5 + 5}`] = ageCounts[i];
        }
        ageRanges["95+"] = ageCounts[19];

        return ageRanges;
    } catch (error) {
        throw new SegimedAPIError("Error al cargar las estadísticas de edades: " + error.message, 500);
    }
};

export default getAgeRangesHandler;
