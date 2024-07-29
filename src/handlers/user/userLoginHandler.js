import {
  CatCountry,
  CatIdType,
  CatRole,
  User,
  LoginRecord,
} from "../../databaseConfig.js";
import SegimedAuthenticationError from "../../error/SegimedAuthenticationError.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mapUser } from "../../mapper/user/userMapper.js";
import moment from "moment-timezone";
import refreshTokenCreationHandler from "./refreshTokenCreationHandler.js";

const {
  JWT_EXPIRATION_SECONDS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION_DAYS,
} = process.env;

const userLoginHandler = async (body) => {
  const { email, password, idNumber } = body;
  let databaseUser;
  const legEmail = String(email).toLowerCase().trim();
  try {
    if (legEmail) {
      databaseUser = await User.findOne({
        where: {
          email: legEmail,
        },
        include: [
          {
            model: CatRole,
            as: "userRole",
          },
          {
            model: CatIdType,
            as: "userIdType",
          },
          {
            model: CatCountry,
            as: "userNationality",
          },
        ],
      });
    }

    if (idNumber) {
      databaseUser = await User.findOne({
        where: {
          idNumber: idNumber,
        },
        include: [
          {
            model: CatRole,
            as: "userRole",
          },
          {
            model: CatIdType,
            as: "userIdType",
          },
          {
            model: CatCountry,
            as: "userNationality",
          },
        ],
      });
    }
    if (databaseUser) {
      const now = moment();

      const loginRecorded = await LoginRecord.create({
        userId: databaseUser.id,
        record: now.format("YYYY-MM-DD HH:mm:ss z"),
      });
    }
  } catch (error) {
    console.error(error);
    throw new SegimedAPIError("Hubo un error procesando la solicitud", 500);
  }
  if (!databaseUser)
    throw new SegimedAuthenticationError(
      "El usuario no se encuentra registrado"
    );

  if (legEmail && databaseUser.verified === false)
    throw new SegimedAuthenticationError("La cuenta no esta verificada.");

  if (legEmail || databaseUser.lastLogin !== null) {
    const doesPasswordMatches = await bcrypt.compare(
      password,
      databaseUser.password
    );
    if (!doesPasswordMatches)
      throw new SegimedAuthenticationError("La contraseña es incorrecta.");
  } else {
    if (databaseUser.password !== password)
      throw new SegimedAuthenticationError("La contraseña es incorrecta.");
  }

  const mappedUser = mapUser(databaseUser.dataValues);

  mappedUser.accessToken = jwt.sign(mappedUser, ACCESS_TOKEN_SECRET, {
    expiresIn: `${JWT_EXPIRATION_SECONDS || "15"}m`,
  });
  mappedUser.refreshToken = jwt.sign(mappedUser, REFRESH_TOKEN_SECRET, {
    expiresIn: `${REFRESH_TOKEN_EXPIRATION_DAYS || 7}d`,
  });

  await refreshTokenCreationHandler({
    userId: mappedUser.userId,
    refreshToken: mappedUser.refreshToken,
  });

  const now = moment();
  databaseUser.lastLogin = now.format("YYYY-MM-DD HH:mm:ss z");
  await databaseUser.save();
  return mappedUser;
};

export default userLoginHandler;
