import getPatientsFilterHandler from "../../handlers/patient/getPatientsFilterHandler.js";

const getPatientsFilterController = async (req, res) => {

    try {
        const filters = Object.entries(req.query)
            .filter(([key, value]) => value !== '')
            .map(([key, value]) => ({key, value}));

        const filteredPatients = await getPatientsFilterHandler(filters)

        res.status(200).json(filteredPatients)

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getPatientsFilterController;