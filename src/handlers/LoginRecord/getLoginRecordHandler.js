
import { LoginRecord } from "../../databaseConfig";

export const getAllLoginRecords = async () => {
    try {
        const loginRecords = await LoginRecord.findAll();
        return loginRecords;
    } catch (error) {
        throw new Error("Error loading Login Records: " + error.message);
    }
};

