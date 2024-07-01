import SegimedInputValidationError from "../../error/SegimedInputValidationError.js";
import {OneTimePassword, User} from "../../databaseConfig.js";
import moment from "moment-timezone";
import {Op} from "sequelize";
import bcrypt from "bcrypt";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const otpMailValidationHandler = async (body) => {
    await inputValidation(body)
    const now = moment()
    let user;
    try {
        user = await User.findOne({
            where: {
                id: body.userId
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
        console.error(error.message)
        throw new SegimedAPIError("Hubo un error al procesar la solicitud", 500)
    }
    //extract active OTP from database User
    const userOneTimePassword = user.oneTimePasswords[0];
    // validate user exists with valid OTP
    if (user && userOneTimePassword) {
        //Compare database OTP value with provided by the API consumer
        const comparingBcryptOtp = await bcrypt.compare(body.temporaryCode, userOneTimePassword.temporaryCode);
        if (comparingBcryptOtp) {
            // if otp provided value matches database value, user is marked as verified and otp is marked as redeemed.
            user.verified = true;
            userOneTimePassword.redeemedTimestamp = new Date()
            await userOneTimePassword.save()
            const validatedUser = await user.save()
            const cleanUser = validatedUser.dataValues
            delete cleanUser['oneTimePasswords']
            return cleanUser
        }
    }
    //Throws error if the code is not validated or if no valid code is provided/stored in database
    throw new SegimedInputValidationError('La cuenta no pudo ser verificada')

};

async function inputValidation(body) {
    const {userId, temporaryCode} = body

    if (!userId || !temporaryCode.trim())
        throw new SegimedInputValidationError('Petición invalida.');

    const userFromDb = await User.findByPk(userId)
    if (!userFromDb)
        throw new SegimedInputValidationError('La cuenta no fue encontrada.');

    if (userFromDb.verified)
        throw new SegimedInputValidationError('La cuenta ya esta verificada.');
}

export default otpMailValidationHandler;

