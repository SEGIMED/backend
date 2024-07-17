import { PatientCardiovascularRisk, CatCardiovascularRisk } from "../../databaseConfig.js";
import { Sequelize } from "sequelize";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getRateESC2022RiskHandler = async () => {
    try {
        const statistics = await PatientCardiovascularRisk.findAll({
            attributes: [
                'risk',
                [Sequelize.fn('COUNT', Sequelize.col('patient')), 'patientCount']
            ],
            include: [{
                model: CatCardiovascularRisk,
                as: 'catCvRisk', 
                attributes: ['name','description']
            }],
            group: ['risk', 'catCvRisk.id']
        });

        // Mapeo los datos
        const result = statistics.reduce((acc, stat) => {
            const riskData = {
                patientCount: stat.get('patientCount'),
                riskName: stat.catCvRisk.name,
                riskDescription: stat.catCvRisk.description
            };

            acc[`risk_${stat.risk}`] = riskData;
            return acc;
        }, {});

        return result;
        
    } catch (error) {
        throw new SegimedAPIError("Error al cargar las estadísticas de riesgo: " + error.message, 500);
    }
};

export default getRateESC2022RiskHandler;