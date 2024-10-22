import {
  PhysicianOnboarding,
  RequestTreatingPhysician,
  User,
} from "../../databaseConfig.js";
import bcrypt from "bcrypt";
import { generateOTP } from "../../utils/generateOTP.js";
import { sendMail } from "../../utils/sendMail.js";
import SegimedInputValidationError from "../../error/SegimedInputValidationError.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { sequelize } from "../../databaseConfig.js";
import confirmEmailHtml from "../../utils/emailTemplates/confirmEmailHtml.js";
import { createRequestHandler } from "../requestTreatingPhysician/requestTreatingPhysicianHandler.js";
import Notify from "../../realtime_server/models/Notify.js";
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
import moment from "moment";

const userRegisterHandler = async (body, frontendUrl) => {
  await inputValidation(body);
  const {
    idNumber,
    idType,
    name,
    lastname,
    password,
    role,
    geolocation,
    avatar,
    areaCode,
    cellphone,
    email,
    nationality,
    token,
  } = body;
  const emailLowerCase = String(email).toLowerCase();

  // Iniciar la transacción manualmente
  const transaction = await sequelize.transaction();

  try {
    // Crear el usuario dentro de la transacción
    const newUser = await User.create(
      {
        idNumber,
        idType,
        name,
        lastname,
        password: await bcrypt.hash(password, 12),
        role,
        verified: false,
        geolocation,
        avatar,
        areaCode,
        cellphone,
        email: emailLowerCase,
        nationality,
      },
      { transaction } // Aseguramos que la operación esté dentro de la transacción
    );

    // Generar OTP dentro de la transacción
    const userOtp = await generateOTP(newUser, transaction); // Pasar la transacción aquí

    const linkVerify = `${frontendUrl}/accounts/verify?codeOTP=${userOtp}&userId=${newUser.id}`;
    const emailSent = confirmEmailHtml(linkVerify);

    // Enviar correo dentro de la transacción
    await sendMail(newUser.email, emailSent, "Link de verificación");

    if (role === "3") {
      const validateToken = await PhysicianOnboarding.findOne({
        where: { token },
        transaction, // Aseguramos que sea dentro de la transacción
      });

      if (!validateToken)
        throw new Error("El token proporcionado no es válido.");

      const currentTime = moment();
      const tokenExpirationTime = moment(validateToken.tokenExpiresAt);

      if (currentTime.isAfter(tokenExpirationTime)) {
        throw new Error("El token ha expirado.");
      }

      // Crear el RequestTreatingPhysician dentro de la transacción
      await RequestTreatingPhysician.create(
        {
          patient: newUser.id,
          physician: validateToken.idPhysician,
          senderType: "Paciente",
          status: "Aceptada",
          isActive: true,
        },
        { transaction }
      );

      // Crear la notificación dentro de la transacción
      const newNotification = new Notify({
        content: {
          notificationType: "patientAssociatedByRegister",
          name: name,
          lastName: lastname,
        },
        target: validateToken.idPhysician,
      });
      await newNotification.save({ transaction });

      // Limpiar el token de PhysicianOnboarding dentro de la transacción
      validateToken.token = null;
      validateToken.tokenExpiresAt = null;
      await validateToken.save({ transaction });
    }

    // Hacer commit si todo ha salido bien
    await transaction.commit();
    return newUser;
  } catch (error) {
    // Hacer rollback si ha habido un error
    await transaction.rollback();
    console.log(error);
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de registro. Por favor intenta de nuevo: " +
        error.message,
      500
    );
  }
};

async function inputValidation(body) {
  const {
    idNumber,
    idType,
    name,
    lastname,
    password,
    role,
    areaCode,
    cellphone,
    email,
    nationality,
  } = body;
  const emailLowerCase = String(email).toLowerCase();
  if (
    !name ||
    !lastname ||
    !email ||
    !idNumber ||
    !idType ||
    !password ||
    !role ||
    !areaCode ||
    !cellphone ||
    !nationality
  )
    throw new SegimedInputValidationError(
      "Por favor, complete todos los campos requeridos."
    );
  if (!EMAIL_REGEX.test(email))
    throw new SegimedInputValidationError(
      "Por favor, ingrese un email valido."
    );
  const emailOnDb = await User.findOne({
    where: {
      email: emailLowerCase,
    },
  });
  if (emailOnDb)
    throw new SegimedInputValidationError(
      "Ya existe una cuenta asociada al correo electrónico."
    );

  const idNumberOnDb = await User.findOne({
    where: {
      idNumber: idNumber,
    },
  });
  if (idNumberOnDb)
    throw new SegimedInputValidationError(
      "Ya existe una cuenta asociada al número de identificación."
    );

  const cellphoneOnDb = await User.findOne({
    where: {
      cellphone: cellphone,
    },
  });
  if (cellphoneOnDb)
    throw new SegimedInputValidationError(
      "Ya existe una cuenta asociada a este número de celular."
    );
  if (password.length < 6)
    throw new SegimedInputValidationError(
      "La contraseña debe contener al menos 6 caracteres."
    );
}

export default userRegisterHandler;
