import SegimedAPIError from "../../error/SegimedAPIError.js";
import { PhysicianAttendancePlace } from "../../databaseConfig.js";

const createPhysicianAttendancePlaceHandler = async (body) => {
  const { physicianId, googleMapsLink, addressDetails, alias } = body;
  try {
    const newPlace = await PhysicianAttendancePlace.create({
      physician: physicianId,
      googleMapsLink,
      addressDetails,
      alias,
    });
    return newPlace;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación.",
      500
    );
  }
};

export default createPhysicianAttendancePlaceHandler;
