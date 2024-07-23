import moment from 'moment-timezone';
import getDeathRateHandler from "../../handlers/statisticalCenter/getDeathRateHandler.js";

const getDeathRateController = async (req, res) => {
    try {
        let { from, to, this_month, this_year } = req.query;

        if (this_year) {
            // Establecer fechas para el año actual
            from = moment().startOf('year').format('YYYY-MM-DD');
            to = moment().endOf('year').format('YYYY-MM-DD');
        } else if (this_month) {
            // Establecer fechas para el mes actual
            from = moment().startOf('month').format('YYYY-MM-DD');
            to = moment().endOf('month').format('YYYY-MM-DD');
        }

        const deathRateStatistics = await getDeathRateHandler(from, to);
        return res.status(200).json(deathRateStatistics);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default getDeathRateController;
