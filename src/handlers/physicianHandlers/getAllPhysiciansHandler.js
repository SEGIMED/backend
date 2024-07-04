import {
    CatMedicalSpecialty,
    CatRole,
    PhysicianDetails,
    PhysicianSpecialty,
    User
} from '../../databaseConfig.js'


const getAllPhysiciansHandler = async () => {
    try {
        const allPhysicians = await User.findAll(
            {
                attributes: ['id', 'name', 'lastname', "email", "cellphone", "avatar"],
                include: [
                    {
                        model: PhysicianSpecialty,
                        as: 'physicianSpecialties',
                        attributes: ['id'],
                        include: {
                            model: CatMedicalSpecialty,
                            as: 'specialty',
                            attributes: ['name']
                        }
                    },
                    {
                        model: PhysicianDetails,
                        as: 'physicianDetails'
                    },
                    {
                        model: CatRole,
                        as: 'userRole',
                        where: {
                            roleName: 'Médico'
                        }
                    }
                ]
            }
        );

        return allPhysicians;

    } catch (error) {
        throw new Error("Error loading physicians: " + error.message);
    }
};

export default getAllPhysiciansHandler;