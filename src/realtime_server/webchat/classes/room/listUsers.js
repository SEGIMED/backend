import User from "../user/user.js";

class ListUsers{
    constructor(){
        this.users = [];
    }
        //join a new user
    joinUser(data,socketId){
        const newUser = new User(data,socketId);
        this.users.push(newUser);
        return newUser;
    }
        //remove a user
    leaveUser(socketId){
         let infoUser;
         this.users = this.users.filter(user => {
            if(user.id === socketId){
                infoUser = user;
                return false
            }
            return true
        });
         return infoUser;
    }
    getListUser(){
        return this.users;
    }
    
    isUserExists(socketId){
        return this.users.some((user) => user.id === socketId);
    }
}


export default ListUsers