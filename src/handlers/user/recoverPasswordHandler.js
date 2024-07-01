import SegimedAPIError from "../../error/SegimedAPIError.js";
import {sequelize, User} from "../../databaseConfig.js";
import SegimedInputValidationError from "../../error/SegimedInputValidationError.js";
import {generateOTP} from "../../utils/generateOTP.js";
import {sendMail} from "../../utils/sendMail.js";


const recoverPasswordHandler = async (body) => {
    const {email} = body


    let databaseUser
    try {
        databaseUser = await User.findOne({
            where: {
                email: email
            }
        })
    } catch (error) {
        console.error(error);
        throw new SegimedAPIError("Hubo un error procesando la solicitud", 500)
    }

    if (!databaseUser)
        throw new SegimedInputValidationError('Este correo no existe.');

    await sequelize.transaction(async t => {
        const userOtp = await generateOTP(databaseUser)
        await sendMail(databaseUser.email, userOtp, "OTP para recuperar tu clave")
    })

    const cleanUser = databaseUser.dataValues
    delete cleanUser.password
    return cleanUser

}

export default recoverPasswordHandler;




