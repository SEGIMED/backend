import { PhysicianSpecialty } from "../../databaseConfig.js";

const updatePhysicianSpecialtyHandler = async (body) => {
  const { id } = body;
  try {
    const updatedSpecialty = await PhysicianSpecialty.update(
      {
        medicalSpecialty: body.medicalSpecialtyId,
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );
    return updatedSpecialty[1];
  } catch (error) {
    throw new Error("Error updating physician specialty: " + error.message);
  }
};

export default updatePhysicianSpecialtyHandler;
