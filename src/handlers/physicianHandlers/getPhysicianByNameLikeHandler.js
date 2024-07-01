import {Op} from "sequelize";
import {
    CatMedicalSpecialty,
    CatRole, PhysicianDetails,
    PhysicianSpecialty,
    User
} from "../../databaseConfig.js";

const getPhysicianByNameLikeHandler = async (name) => {
    try {
        const physicianSearchResults = await User.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${name}%`
                            }
                        },
                        {
                            lastname: {
                                [Op.iLike]: `%${name}%`
                            }
                        }
                    ]
                },
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
                        model: PhysicianDetails,
                        as: 'physicianDetails'
                    },
                    {
                        model: PhysicianSpecialty,
                        as: 'physicianSpecialties',
                        attributes: ['id'],
                        include: {
                            model: CatMedicalSpecialty,
                            as: 'specialty',
                            attributes: ['name']
                        }
                    }
                ],
                order: [
                    ['name', 'ASC'],
                    ['lastname', 'ASC']
                ]
            }
        );
        return physicianSearchResults.map(function (physician) {
            return mapPhysicianInfo(physician)
        });
    } catch (error) {
        throw new Error("Error loading physicians: " + error.message);
    }
}

function mapPhysicianInfo(physicianFromDB) {
    const rawPhysician = physicianFromDB.dataValues
    const mappingResult = {
        id: rawPhysician.id,
        idNumber: rawPhysician.idNumber,
        name: rawPhysician.name,
        lastname: rawPhysician.lastname,
        role: rawPhysician.userRole.roleName,
        physicianSpecialties: rawPhysician.physicianSpecialties.map(function (specialty) {
            return {
                id: specialty.dataValues.id,
                name: specialty.dataValues.specialty.name
            }
        }),
        rating: parseFloat(rawPhysician.physicianDetails.dataValues.reviewsScore)
    }
    return mappingResult;
}

export default getPhysicianByNameLikeHandler;