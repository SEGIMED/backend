import { PatientHeartFailureClassification, CatHeartFailureClassification } from "../../databaseConfig.js";
import { Sequelize } from "sequelize";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getRateHeartFailurHandler = async () => {
    try {
        const statistics = await PatientHeartFailureClassification.findAll({
            attributes: [
                'heartFailureClassification',
                [Sequelize.fn('COUNT', Sequelize.col('patient')), 'patientCount']
            ],
            include: [{
                model: CatHeartFailureClassification,
                as: 'CatHeartFailureClass', 
                attributes: ['name','description']
            }],
            group: ['heartFailureClassification', 'CatHeartFailureClass.id']
        });

        const result = statistics.reduce((acc, stat) => {
            const classification = {
                patientCount: stat.get('patientCount'),
                heartFailureName: stat.CatHeartFailureClass.name,
                heartFailureDescription: stat.CatHeartFailureClass.description
            };
            
            acc[`heartFailureClassification_${stat.heartFailureClassification}`] = classification;
            return acc;
        }, {});
        return result;
    } catch (error) {
        throw new SegimedAPIError("Error al cargar las estadísticas de riesgo: " + error.message, 500);
    }
};

export default getRateHeartFailurHandler;