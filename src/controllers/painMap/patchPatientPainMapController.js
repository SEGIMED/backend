import patchPatientPainMapHandler from "../../handlers/painMap/patchPatientPainMapHandler.js"
const patchPatientPainMapController = async (req, res) => {
    try {
        const newPainMap = await patchPatientPainMapHandler(req.body);
        return res.status(200).json(newPainMap);

    } catch (error) {
        return res.status(500).json('Error al actualizar la autorevisión: ',{error: error.message});
    }
}

export default patchPatientPainMapController;