import {User} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import contextService from "request-context";

const updateUserHandler = async (body) => {
    try {
        const updateUser = await User.update(
            {
                idNumber: body.idNumber,
                idType: body.idType,
                name: body.name,
                lastname: body.lastname,
                avatar: body.avatar,
                cellphone: body.cellphone,
                email: body.email,
                nationality: body.nationalityId,
                currentLocation: body.currentLocationId
            },
            {
                where: {
                    id: contextService.get('request:user').userId
                },
                attributes: {
                    exclude: ['password']
                },
                returning: true,
                plain: true
            }
        )
        const cleanUser = updateUser[1].dataValues
        delete cleanUser.password
        return cleanUser
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante la actualización.', 500)
    }
};

export default updateUserHandler;