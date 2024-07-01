import {
    CatMedicalSpecialty,
    CatRole,
    PhysicianSpecialty,
    User
} from "../../databaseConfig.js";

const getPhysiciansBySpecialtyIdHandler = async (specialtyId) => {
    try {
        const physiciansBySpecialty = await User.findAll(
            {
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: CatRole,
                        as: 'userRole',
                        where: {
                            roleName: 'Médico'
                        },
                    },
                    {
                        model: PhysicianSpecialty,
                        as: 'physicianSpecialties',
                        attributes: ['id'],
                        include: {
                            model: CatMedicalSpecialty,
                            as: 'specialty',
                            attributes: ['name'],
                            where: {
                                id: specialtyId,
                            }
                        },
                    },
                ],
            }
        );

        return physiciansBySpecialty;
    } catch (error) {
        throw new Error("Error loading physicians: " + error.message);
    }
};

export default getPhysiciansBySpecialtyIdHandler;