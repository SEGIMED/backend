import getAllLoginRecords from "../../handlers/LoginRecord/getLoginRecordHandler.js";  


const getAllLoginRecordController = async (req, res) => {
    try {
        const loginRecords = await getAllLoginRecords()
        res.status(200).json(loginRecords);
    } catch (error) {
        return res.status(error.errorCode).json({error: error.message});
    }
};

export default getAllLoginRecordController;