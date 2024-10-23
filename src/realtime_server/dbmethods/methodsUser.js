import UserMongoDb from "../models/user.js";
import {
    CatCountry,
    CatIdType,
    CatRole,
    User as UserSQL,
  } from "../../databaseConfig.js";
import { mapUser } from "../../mapper/user/userMapper.js";

export async function getUserWithPopulate(userId) {
  try {
    const findUser = await UserMongoDb.findOne({ userId: userId }).populate({
      path: "notify",
      populate: {
        path: "sender target",
        select: "-notify",
      },
    });
    if (findUser) return findUser;
    throw new Error("User isn't registred in database of mongoDB");
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllUsersWithPopulate(){
    try {
        const findUsers = await UserMongoDb.find({}).populate({
          path: "notify",
          populate: {
            path: "sender target",
            select: "-notify",
          },
        });
        if (findUsers && findUsers.length) return findUsers;
        throw new Error("User isn't registred in database of mongoDB");
      } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getUserSQL(userId) {
  try {
    const getUser = await UserSQL.findOne({
      where: { id: userId },
      include: [
        {
          model: CatRole,
          as: "userRole",
        },
        {
          model: CatIdType,
          as: "userIdType",
        },
      ],
    });
    if (!getUser) throw new Error("Id del usuario no encontrada en la base de datos.");
    const mappedUser = mapUser(getUser.dataValues);

    return mappedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function createUserMongoDB(data, mapper=false){
    try {
        let dataUser = data;
        if(!mapper){
            dataUser = {
                fullName: `${data.name} ${data.lastname}`,
                role: data.role,
                userId: data.userId,
                avatar: data.avatar,
                nationality: data.nationality
            }
        }
        const newUser = await UserMongoDb.create(dataUser);
        return newUser
    } catch (error) {
        console.log(error)
        return null
    }
}