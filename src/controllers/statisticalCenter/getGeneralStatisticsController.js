import moment from 'moment-timezone';
import getDeathRateHandler from "../../handlers/statisticalCenter/getDeathRateHandler.js";
import getGenderDistributionHandler from '../../handlers/statisticalCenter/getGenderDistributionHandler.js';
import getPatientActivityDistributionHandler from '../../handlers/statisticalCenter/getPatientActivityDistributionHandler.js';
import getAlarmEventsStatisticsHandler from '../../handlers/statisticalCenter/getAlarmEventsStatisticsHandler.js';

const getGeneralStatisticsController = async (req, res) => {
    try {
        let actual_year = {
            from : moment().startOf('year').format('YYYY-MM-DD'),
            to : moment().endOf('year').format('YYYY-MM-DD'),
        }
        let actual_month = {
            from : moment().startOf('month').format('YYYY-MM-DD'),
            to : moment().endOf('month').format('YYYY-MM-DD'),
        }

        const yearDeathRateStatistics = await getDeathRateHandler(actual_year.from, actual_year.to);
        const monthDeathRateStatistics = await getDeathRateHandler(actual_month.from, actual_month.to);
        const genderStatistics = await getGenderDistributionHandler();
        const patientActivityDistribution = await getPatientActivityDistributionHandler();
        const yearAlarmEventsStatistics = await getAlarmEventsStatisticsHandler(actual_year.from, actual_year.to)
        const monthAlarmEventsStatistics = await getAlarmEventsStatisticsHandler(actual_month.from, actual_month.to);
        const statistics = {yearAlarmEventsStatistics, monthAlarmEventsStatistics, yearDeathRateStatistics, monthDeathRateStatistics, genderStatistics, patientActivityDistribution};

        return res.status(200).json(statistics);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default getGeneralStatisticsController;