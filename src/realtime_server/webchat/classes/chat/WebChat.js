import ChatModel from "../../../models/Chat.js";
import UserModel from "../../../models/user.js";

import GroupChat from "../../../models/GroupChat.js";
import Notify from "../../../models/Notify.js";
import mongoDataBase from "../../../db.js";
import { formatDataChat, formatDataChatGroup } from "../../helpers/formatData.js";
import ListUser from "../user/listUser.js";
import listChats from "./listChats.js";
import classMessage from "../messages/messages.js"
class WebChat {
  constructor() {
    this.listUser = ListUser
    this.listChat = listChats
    if (!WebChat.instance) {
      WebChat.instance = this;
    }
  }
 

  // get  user data with notify in database only when the user joined in the socket.
  async getDataUser(data) {
    try {
      const { userId } = data;
      let findUser = await UserModel.findOne({ userId: userId }).populate({
        path: "notify",
        populate: {
          path: "sender target",
          select: "-notify",
        },
      });
      // return a new error if user found in database else  return the user.

      if (!findUser) {
        const registerUser = await this.registerUser(data);
        if (registerUser) return await this.getDataUser(data);
        throw new Error(
          "El usuario no ha sido encontrado en la base de datos, registrar primero."
        );
      }

      // format user data and then pass it to the front
      const formatDataUser = findUser.toObject();
      formatDataUser.seenNotify = formatDataUser.notify.filter((n) => n.state);
      formatDataUser.unseenNotify = formatDataUser.notify.filter(
        (n) => !n.state
      );
      delete formatDataUser.notify;
      return formatDataUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  // async getAllChatUser({ userId }) {
  //   try {
  //     //
  //     let chats = await ChatModel.find({ users: userId }).populate({
  //       path: "messages",
  //       populate: {
  //         path: "sender target",
  //         select: "-notify",
  //       },
  //     });

  //     // format a data.
  //     chats = await Promise.all(
  //       chats.map(async (chat) => {
  //         let chatObj = await formatDataChat(chat,userId,false);
  //         return chatObj;
  //       })
  //     );
  //     return chats;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }

  // async getAllChatGroupUser({ userId, role }) {
  //   try {
  //     if (role === "Paciente")
  //       throw new Error(
  //         "El rol es insuficiente para acceder a esta información."
  //       );
  //     let chats = await GroupChat.find({ users: userId })
  //       .populate({
  //         path: "messages",
  //         populate: {
  //           path: "sender",
  //           select: "-notify",
  //         },
  //       })
  //       .exec();
  //     chats = chats.map((chat) => {
  //       let chatObj = formatDataChatGroup(chat,userId);
  //       return chatObj;
  //     });

  //     return chats;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }
  sendChatMessage(userId,targetId,message) {
      let chat = this.findOrCreateChat(userId,targetId,message);
      if(chat) return chat;
      console.log(`Error in create Chat to ${userId} and ${targetId}`);
  }

  findOrCreateChat(userId, targetId, message) {
   let chat = this.listChat.getChat(userId,targetId);
   let isNewChat = false
   if(!chat){
      chat = this.listChat.createNewChat(userId,targetId);
      isNewChat = true;
   }
   
   if(message){
    const findUser = this.listUser.getUser(userId);
    const findTarget = this.listUser.getUser(targetId);
    if(!findTarget){
      console.log(`Error to create a message targetId ${targetId} isn't exist's in local state.`);
    }
    const newMessage = new classMessage(findUser,findTarget,message);
    chat.messages.push(newMessage);
    // let target = chat.users.find(user => user != userId);
    // target = this.listUser.getUser(target);
    chat = chat.mapper()
    // chat.target= target;

    return { chat:chat , lastMessage: newMessage, isNewChat: isNewChat}
   }
  //  let target = chat.users.find(user => user != userId);
  //  target = this.listUser.getUser(target);
   chat = chat.mapper();
  //  chat.target= target;
   
   return { chat:chat, isNewChat:isNewChat}

  }


  //  set to true a message
  async setSeenMessage(unseenMessages){
      for (let messageId of unseenMessages) {
          let message = await MessageModel.findById(messageId);
          if (message) {
              await message.markAsSeen();
          }
      }
  }

  async getChatById(data){
    try {
        const chatMessage = await formatDataChat(data,data.userId);
        return chatMessage;
    } catch (error) {
        console.log(error);
        return null
    }
  }
  // //get all chats of a user
  // async getChats(id){

  //     let chats = await this.model.find({ users: id }).populate({
  //         path: 'messages',
  //         populate: { path: 'user',select: '-notify' }
  //     }).exec();

  //     chats = chats.map(chat => {
  //         let chatObj = chat.toObject();
  //         chatObj.seenMessages = chatObj.messages.filter(message => message.state === true);
  //         chatObj.unseenMessages = chatObj.messages.filter(message => message.state === false);
  //         delete chatObj.messages;
  //         return chatObj;
  //     });

  //     return chats;
  // }

  // //get info chat by id.
  // async getChatById(chatId){
  //     let chat = await this.model.findById(chatId).populate({
  //         path: 'messages',
  //         populate: { path: 'user' }
  //     }).exec();

  //     let chatObj = chat.toObject();
  //     chatObj.seenMessages = chatObj.messages.filter(message => message.state === true);
  //     chatObj.unseenMessages = chatObj.messages.filter(message => message.state === false);
  //     delete chatObj.messages;
  //     return chatObj;
  // }

  // async getGroupChats(userID){

  //     let chats = await this.groupModel.find({ users: userID }).populate({
  //         path: 'messages',
  //         populate: { path: 'user' }
  //     }).exec();

  //     chats = chats.map(chat => {
  //         let chatObj = chat.toObject();
  //         chatObj.seenMessages = chatObj.messages.filter(message => message.state === true);
  //         chatObj.unseenMessages = chatObj.messages.filter(message => message.state === false);
  //         delete chatObj.messages;
  //         return chatObj;
  //     });

  //     return chats;
  // }
  // async createGroupChat(name,userID){
  //     try {
  //         //create a new group.
  //         const chatGroup = new this.groupModel();
  //         chatGroup.name = name;
  //         chatGroup.owner = userID;
  //         await chatGroup.addUser(userID);
  //         await chatGroup.save();
  //         return chatGroup
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  // async getGroupChatById(id){
  //     try {
  //         const group = await this.groupModel.findOne({_id:id}).populate({
  //             path: 'messages',
  //             populate: { path: 'user',select: '-notify' }
  //         }).exec();

  //         let chatObj = group.toObject();
  //         chatObj.seenMessages = chatObj.messages.filter(message => message.state === true);
  //         chatObj.unseenMessages = chatObj.messages.filter(message => message.state === false);
  //         delete chatObj.messages;
  //         return chatObj;
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  // async deleteGroupChat(id,userID){
  //     const group = await this.getGroupChatById(id);
  //     if(!group) return null
  //     const users = [...group.users];
  //     const deleteCount = await this.groupModel.deleteMany({owner:userID, _id:id});
  //     return {users,deleteCount}
  // }

  // async joinGroupChat(id,userID){
  //     try {
  //         const group = await this.groupModel.findOne({_id:id});
  //         if(!group) throw new Error("id room not found");
  //         await group.addUser(userID);
  //         return await this.getGroupChatById(id);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  // async createNotify(targetID,userID,content){
  //     const dataUser = await this.getDataUser(userID);
  //     const dataTarget = await this.getDataUser(targetID);
  //     const notify = new Notify({
  //         content: content,
  //         user: dataUser._id,
  //         state:false,
  //         date: new Date()
  //     });

  //     await notify.save()
  //     await dataTarget.addNotify(notify._id);
  //     return notify
  // }

  // async sendMessageGroup(userID,idRoom,message){
  //     const dataUser = await this.getDataUser(userID);
  //     const group = await this.groupModel.findOne({_id:idRoom});
  //     const newMessage = new MessageModel({
  //        user: dataUser._id,
  //        text:message,
  //        state:false,
  //        date: new Date()
  //     });
  //     await newMessage.save();
  //     await group.addMessage(newMessage);
  //     return await this.getGroupChatById(group._id);
  // }
}

const webchat = new WebChat();
export default webchat;
