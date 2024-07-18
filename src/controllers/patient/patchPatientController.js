import { loadImage } from "../../utils/cloudinary/cloudinary.js";
import patchPatientHandler from "../../handlers/patient/patchPatientHandler.js";

const patchPatientController = async (req, res, name,lastname,cellphone,email,city,country,avatar,patientId,verified, geolocation,treatingPhysician) => {
    try {
        
  
        const updates = {patientId};


        if (idNumber) {
            updates.idNumber = idNumber;
        }
        if (idType) {
            updates.idType = idType;
        }

        if (name) {
            updates.name = name;
        }

        if (lastname) {
            updates.lastname = lastname;
        }
        if (geolocation) {
            updates.geolocation = geolocation;
        }
        if (lastname) {
            updates.lastname = lastname;
        }
        if (cellphone) {
            updates.cellphone = cellphone;
        }
        if (email) {
            updates.email = email;
        }
        if (verified) {
            updates.verified = verified;
        }
        if (avatar) {
            updates.avatar = avatar;
        }
        if (city){
            updates.city=city
        }
        if(country){
            updates.country=country
        }
        if(treatingPhysician){
            updates.treatingPhysician=treatingPhysician
        }

        const patientUpdated = await patchPatientHandler(updates);

        return res.status(200).json(patientUpdated);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

export default patchPatientController;
