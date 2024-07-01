import {User, UserCurrentLocation} from "../../databaseConfig.js";
import { loadImage } from "../../utils/cloudinary/cloudinary.js";

const regexPositiveNumbers = /^[1-9][0-9]*$/;
const patchPatientHandler = async (patchPatientBody) => {

  try {
    if (!regexPositiveNumbers.test(patchPatientBody.patientId)) {
      throw new Error("El id del usuario debe ser un entero positivo");
    }
    if (patchPatientBody.geolocation) {
      patchPatientBody.geolocation = JSON.parse(patchPatientBody.geolocation)
    }

    if(patchPatientBody.avatar){
      const avatarr = JSON.parse(patchPatientBody.avatar)
      const Imagen = await loadImage(patchPatientBody.patientId, avatarr)
      patchPatientBody.avatar = Imagen?.url;
    }

    const patient = await User.findByPk(patchPatientBody.patientId);

    if (patient.role != 3 || patient?.length === 0)
      throw new Error(`Paciente no encontrado`);

    let currentLocation
    if (!patient.currentLocation && patchPatientBody.city && patchPatientBody.country) {
      currentLocation = await UserCurrentLocation.create({
        user: patchPatientBody.patientId,
        city: patchPatientBody.city,
        country: patchPatientBody.country
      })

      patient.currentLocation = currentLocation.id
      await patient.save()

    } else if (patchPatientBody.city && patchPatientBody.country) {
      const currentLocationUpdate = await UserCurrentLocation.update(
        {
          city: patchPatientBody.city,
          country: patchPatientBody.country
        },
        { where: { user: patchPatientBody.patientId } }
      )
    }


    await patient.update({
      name: patchPatientBody.name ? patchPatientBody.name : patient.name,
      lastname: patchPatientBody.lastname ? patchPatientBody.lastname : patient.lastname,
      cellphone: patchPatientBody.cellphone ? patchPatientBody.cellphone : patient.cellphone,
      email: patchPatientBody.email ? patchPatientBody.email : patient.email,
      avatar: patchPatientBody.avatar ? patchPatientBody.avatar : patient.avatar,
      verified: patchPatientBody.verified ? patchPatientBody.verified : patient.verified,
      geolocation: patchPatientBody.geolocation ? patchPatientBody.geolocation : patient.geolocation
    });

    return {
      patient: patient,
      city: patchPatientBody.city,
      country: patchPatientBody.country
    };
  } catch (error) {
    throw new Error("Error updating patient: " + error.message);
  }

};

export default patchPatientHandler;
