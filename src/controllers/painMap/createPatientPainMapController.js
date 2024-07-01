import createPatientPainMapHandler from "../../handlers/painMap/createPatientPainMapHandler.js";


const createPatientPainMapController = async (req, res) => {
    try {
        const newPainMap = await createPatientPainMapHandler(req.body);
        return res.status(200).json(newPainMap);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPatientPainMapController;