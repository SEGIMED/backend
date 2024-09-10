import getCatalogHandler from "../../handlers/catalog/getCatalogHandler.js";


const getCatalogController = async (req, res) => {
    try {
        const catalogName = req.query.catalogName;
        const category = req.query.category
        const catalog = await getCatalogHandler(catalogName, category)
        res.status(200).json(catalog);
    } catch (error) {
        return res.status(error.errorCode).json({error: error.message});
    }
};

export default getCatalogController;