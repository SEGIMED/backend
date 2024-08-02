import SegimedAPIError from "../../error/SegimedAPIError.js";
import patchPatientHandler from "../../handlers/patient/patchPatientHandler.js"
//Name, lastname, cellphone, email, ciudad, provincia, país, foto de perfil. Mandatory patientID
import updateSociodemographicDetailsHandler from "../../handlers/sociodemographicDetails/updateSociodemographicDetailsHandler.js"
//sociodemographic details: fecha de nacimiento, sexo,emergencyContactPhone. Mandatory patientID

const updateFullPatientController = async (req, res) => {
    try {
        const {
            patientId,
            name,
            lastname,
            genreId,
            birthDate,
            cellphone,
            emergencyContactPhone,
            email,
            city,
            country,
            avatar,
            verified,
            geolocation,
            educationalLevelId,
            profession,
            civilStatusId,
            address,
            healthCarePlanId,
            dateOfDeathReport,
            treatingPhysician
        } = req.body

        const patchPatientBody = { name, lastname, cellphone, email, city, country, avatar, patientId, verified, geolocation,treatingPhysician }
        const patchSociodemographicBody = { genreId, birthDate, emergencyContactPhone, patientId, educationalLevelId, profession, civilStatusId, address, healthCarePlanId, dateOfDeathReport }

        const updatePatientBasic = await patchPatientHandler(patchPatientBody)

        const updateSociodemographic = await updateSociodemographicDetailsHandler(patchSociodemographicBody)


        return res.status(200).json({ updatePatientBasic, updateSociodemographic });
    } catch (error) {
        throw new SegimedAPIError(error, 500)
    }
}

export default updateFullPatientController