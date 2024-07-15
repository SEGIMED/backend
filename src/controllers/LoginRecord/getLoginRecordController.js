import { getAllLoginRecords } from "../../handlers/LoginRecord/getLoginRecordHandler.js";  

const getAllLoginRecordController = async (req, res) => {
    try {
        const loginRecord = await getAllLoginRecords();
        return res.status(200).json(loginRecord);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default getAllLoginRecordController;
