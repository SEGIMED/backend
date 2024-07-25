import {User} from "../../databaseConfig.js";
import bcrypt from "bcrypt";
import {generateOTP} from "../../utils/generateOTP.js";
import {sendMail} from "../../utils/sendMail.js";
import SegimedInputValidationError from "../../error/SegimedInputValidationError.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import {sequelize} from "../../databaseConfig.js";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const userRegisterHandler = async (body) => {
    await inputValidation(body)
    const {
        idNumber, idType, name, lastname, password, role, geolocation, avatar, cellphone, email, nationality
    } = body;
    const validEmail = String(email.toLowerCase().trim()); // convertimos email en una cadena de texto en minúsculas y sin espacios en blanco
    try {
        const newUser = await sequelize.transaction(async t => {
            const newUser = await User.create({
                idNumber,
                idType,
                name,
                lastname,
                password: await bcrypt.hash(password, 12),
                role,
                verified: false,
                geolocation,
                avatar,
                cellphone,
                email: validEmail,
                nationality
            })

            const userOtp = await generateOTP(newUser)
            //uncomment the following line once send mail credentials are fixed
            await sendMail(newUser.email, userOtp, "OTP para validar tu correo")
            return newUser
        })
        return newUser
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de registro. Por favor intenta de nuevo', 500)
    }
}

async function inputValidation(body) {
    const {
        idNumber, idType, name, lastname, password, role, cellphone, email, nationality
    } = body;
    const validEmail = String(email.toLowerCase().trim()); // convertimos email en una cadena de texto en minúsculas y sin espacios en blanco
    if (!name || !lastname || !validEmail || !idNumber || !idType || !password || !role || !cellphone || !nationality) throw new SegimedInputValidationError('Por favor, complete todos los campos requeridos.');
    if (!EMAIL_REGEX.test(email)) throw new SegimedInputValidationError('Por favor, ingrese un email valido.');
    const emailOnDb = await User.findOne({
        where: {
            email: validEmail
        }
    })
    if (emailOnDb)
        throw new SegimedInputValidationError('Ya existe una cuenta asociada al correo electrónico.');

    const idNumberOnDb = await User.findOne({
        where: {
            idNumber: idNumber
        }
    })
    if (idNumberOnDb)
        throw new SegimedInputValidationError('Ya existe una cuenta asociada al número de identificación.');
    
    const cellphoneOnDb = await User.findOne({
        where:{
            cellphone:cellphone
        }
    })
    if(cellphoneOnDb)
        throw new SegimedInputValidationError('Ya existe una cuenta asociada a este número de celular.');
    if (password.length < 6) throw new SegimedInputValidationError('La contraseña debe contener al menos 6 caracteres.');
}

export default userRegisterHandler;