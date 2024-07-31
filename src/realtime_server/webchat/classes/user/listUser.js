import User from "./user.js";

import {
  getUserWithPopulate,
  getAllUsersWithPopulate,
  createUserMongoDB,
  getUserSQL,
} from "../../../dbmethods/methodsUser.js";

class ListUser {
  constructor() {
    this._users = new Map();
    if (!ListUser.instance) {
      ListUser.instance = this;
    }
    return ListUser.instance;
  }

  async addList() {
    const users = await getAllUsersWithPopulate();
    users.forEach((user) => {
      const newUser = new User(user);
      this._users.set(newUser.userId, newUser);
    });

    // console.log(`Created local state of users: ${this._users.size}`);
    // console.log(this._users);
  }

  addUser(user) {
    const newUser = new User(user);
    this._users.set(newUser.userId, newUser);
    return newUser;
  }

  getUser(userId) {
    //find the user in map of ListUser
    const findUser = this._users.get(userId);
    if (!findUser) return null;
    return findUser;
  }

  async getUserMongoDB(userId) {
    try {
      const findUser = getUserWithPopulate(userId);
      if (findUser) return findUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async registerUser(data, requiredSQL = false) {
    try {
      let findUser;
      //if is required find data in the database SQL
      if (requiredSQL) findUser = await getUserSQL(data);
      // if isn't required only added in the local state to a quick request after finishing the event.
      else {
        const model = {
          _id: "temporal",
          fullName: `${data.name} ${data.lastname}`,
          userId: data.userId,
          avatar: data.avatar,
          nationality: data.nationality,
          role: data.role,
        };
        this.addUser(model);
      }

      return findUser;
    } catch (error) {
      console.log(error);
    }
  }

  async saveUserDatabase(userId) {
    try {
      const dataUser = this._users.get(userId);
      const result = await createUserMongoDB(dataUser);
      if (!result)
        throw new Error(
          "Error in created the user in Mongo Database.",
          dataUser
        );
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new ListUser();
