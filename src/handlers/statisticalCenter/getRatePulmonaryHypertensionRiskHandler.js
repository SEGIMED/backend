import { PatientPulmonaryHypertensionRisk, CatPulmonaryArterialHypertensionRisk } from "../../databaseConfig.js";
import { Sequelize } from "sequelize";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getRatePulmonaryHypertensionRiskHandler = async () => {
    try {
        const statistics = await PatientPulmonaryHypertensionRisk.findAll({
            attributes: [
                'pulmonaryHypertensionRisk',
                [Sequelize.fn('COUNT', Sequelize.col('patient')), 'patientCount']
            ],
            include: [{
                model: CatPulmonaryArterialHypertensionRisk,
                as: 'catHpRisk', 
                attributes: ['name']
            }],
            group: ['pulmonaryHypertensionRisk', 'catHpRisk.id']
        });

        const result = statistics.reduce((acc, stat) => {
            const riskData = {
                patientCount: stat.get('patientCount'),
                riskName: stat.catHpRisk.name,
                riskDescription: stat.catHpRisk.description
            };

            acc[`risk_${stat.pulmonaryHypertensionRisk}`] = riskData;
            return acc;
        }, {});

        return result;
    } catch (error) {
        throw new SegimedAPIError("Error al cargar las estadísticas de riesgo: " + error.message, 500);
    }
};

export default getRatePulmonaryHypertensionRiskHandler;
