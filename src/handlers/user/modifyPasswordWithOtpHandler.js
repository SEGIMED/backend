import SegimedInputValidationError from "../../error/SegimedInputValidationError.js";
import {OneTimePassword, User} from "../../databaseConfig.js";
import {Op} from "sequelize";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import bcrypt from "bcrypt";


const modifyPasswordWithOtpHandler = async (body) => {
    await inputValidation(body)
    const {userEmail, temporaryCode, userPassword} = body
    let databaseUser
    const now = moment()
    try {
        databaseUser = await User.findOne({
            where: {
                email: userEmail
            },
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: OneTimePassword,
                    as: 'oneTimePasswords',
                    where: {
                        redeemedTimestamp: null,
                        expirationTimestamp: {
                            [Op.gt]: now
                        }
                    },
                },
            ]
        })
    } catch (error) {
        console.error(error);
        throw new SegimedAPIError("Hubo un error procesando la solicitud", 500)
    }
    if (!databaseUser)
        throw new SegimedInputValidationError('Este correo no existe.');
    const userOneTimePassword = databaseUser.oneTimePasswords[0];

    if (databaseUser && userOneTimePassword) {

        const comparingBcryptOtp = await bcrypt.compare(temporaryCode, userOneTimePassword.temporaryCode);
        if (comparingBcryptOtp) {
            databaseUser.password = await bcrypt.hash(userPassword, 12);
            const savedUser = await databaseUser.save()
            userOneTimePassword.redeemedTimestamp = new Date()
            await userOneTimePassword.save()
            const cleanUser = savedUser.dataValues
            delete cleanUser['oneTimePasswords']
            delete cleanUser.password
            return cleanUser
        }
    }
    throw new SegimedInputValidationError('La cuenta no pudo ser verificada')

}

async function inputValidation(body) {
    const {userEmail, temporaryCode, userPassword} = body
    if (!userEmail || !temporaryCode.trim() || !userPassword.trim())
        throw new SegimedInputValidationError('Petición invalida.');

}

export default modifyPasswordWithOtpHandler;