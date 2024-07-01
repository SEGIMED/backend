import updateSociodemographicDetailsHandler
    from "../../handlers/sociodemographicDetails/updateSociodemographicDetailsHandler.js";


const updateSociodemographicDetailsController = async (req, res) => {
    try {
        const updateSociodemographicDetail = req.body;
        const detail = await updateSociodemographicDetailsHandler(updateSociodemographicDetail);
        return res.status(200).json(detail);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateSociodemographicDetailsController;