import mongoose from "mongoose"
import { mapUserMongoDB } from "../mapper/user/userMapper.js";
import UserModel from "./models/user.js";
import {
  CatCountry,
  CatIdType,
  CatRole,
  User,
} from "../databaseConfig.js";
import listUser from "./webchat/classes/user/listUser.js";
import listChats from "./webchat/classes/chat/listChats.js";

const {DB_CHAT} = process.env
class Database {
    constructor() {
      this._connect()
    }
    
  _connect() {
       mongoose.connect(`${DB_CHAT}`)
         .then(() => {
           console.log('Mongo Atlas Database connection successful')
           this._init().then(()=> console.log('Update user database in Mongo Atlas'))
            .catch((er) => console.log(er))
         })
         .catch(err => {
           console.error('Database connection error')
         })
    }

    async _init(){

        try {
          const getUsers = await User.findAll({
            where: { },
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
          
          const mappedUsers = getUsers.map((user) =>{
            return mapUserMongoDB(user.dataValues);
          })
         //insert the data user only if isn't exists!
        const result =  await Promise.all(mappedUsers.map(user => {
            return UserModel.updateOne(
              { userId: user.userId },
              { $set: { ...user } },
              { upsert: true }
            );
          }));
          await listUser.addList();
          await listChats.addList();
        } catch (error) {
          console.log(error);
          return null;
        }
      
    }
  }
  
export default new Database()