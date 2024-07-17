import { PhysicianFavoritePatient, User, PatientPulmonaryHypertensionRisk, CatPulmonaryArterialHypertensionRisk } from "../../databaseConfig.js";

import SegimedAPIError from "../../error/SegimedAPIError.js";

const getPhysicianFavoritePatientHandler = async (physicianId, page, limit) => {
  try {
    limit = parseInt(limit);
    page = parseInt(page);
    const offset = (page - 1) * limit;
    const { count, rows: favoritePatients } =
      await PhysicianFavoritePatient.findAndCountAll({
        where: {
          physicianId: physicianId,
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: [
              "id",
              "idNumber",
              "idType", 
              "name",
              "lastname",
              "role",
              "verified",
              "avatar",
              "nationality",
              "lastLogin",
              "currentLocation",
              "geolocation",
              "id_type"
            ],
            include: [
              {
                model: PatientPulmonaryHypertensionRisk,
                as: 'patientPulmonaryHypertensionRisks',
                include: {
                  model: CatPulmonaryArterialHypertensionRisk,
                  as: 'catHpRisk',
                  attributes: ['name'],
                },
              },
            ],
          },
        ],
        limit,
        offset,
      });
    const totalPages = Math.ceil(count / limit);

    // Mapea los datos para formatearlos como los requiere el front
    const result = favoritePatients.map(favPatient => ({
      id: favPatient.id,
      favoritePatient: favPatient.patient,
      physicianId: favPatient.physicianId,
      id: favPatient.user.id,
      idNumber: favPatient.user.idNumber,
      idType: favPatient.user.idType,
      name: favPatient.user.name,
      lastname: favPatient.user.lastname,
      role: favPatient.user.role,
      verified: favPatient.user.verified,
      avatar: favPatient.user.avatar,
      nationality: favPatient.user.nationality,
      lastLogin: favPatient.user.lastLogin,
      currentLocation: favPatient.user.currentLocation,
      geolocation: favPatient.user.geolocation,
      id_type: favPatient.user.id_type,
      patientPulmonaryHypertensionRisks: favPatient.user.patientPulmonaryHypertensionRisks?.length > 0 ? {
        risk: favPatient.user.patientPulmonaryHypertensionRisks[0].catHpRisk?.name || null,
        timestamp: favPatient.user.patientPulmonaryHypertensionRisks[0].registerTimestamp
    } : null
    }));

    return {
      totalUsers: count,
      totalPages: totalPages,
      currentPage: page,
      user: result,
    };

  } catch (error) {
    console.error(error)
    throw new SegimedAPIError("Hubo un error al obtener los favoritos.", 500);
  }
};

export default getPhysicianFavoritePatientHandler;
