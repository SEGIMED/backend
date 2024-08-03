import { createChatMongoDb, getAllChatsWithPopulate } from "../../../dbmethods/methodsChat.js";

import Chat from "./chat.js";
class ListChat{
    constructor(){
        this._list = new Map();
        this._chatIndexUser = new Map();
        if(!ListChat.instance){
            ListChat.instance = this;
        }
        return ListChat.instance
    }
    async addList(){
       try {
          const chats = await getAllChatsWithPopulate();
          if(!chats) throw new Error('No chats found');
          chats.forEach(chatdb => {
            const chatdbCopy = JSON.parse(JSON.stringify(chatdb));
            const newChat = new Chat(chatdbCopy);
            const {users} = newChat;
            const key = this.generateKey(users);
            this.addIndexUserChat(users,key);
            this._list.set(key,newChat);
          });
        //   console.log(`Created local state of Chats: ${this._list.size}`);
       } catch (error) {
            console.log(error)
        return null
       }

    }
    addChat(data){
        const newChat = new Chat(data);
        const {users} = newChat;
        const key = this.generateKey(users);
        this.addIndexUserChat(users,key);
        this._list.set(key,newChat);
    }
    createNewChat(userId,targetId){
        const users = [userId,targetId]
        const key = this.generateKey(users);
        const newChat = new Chat({
            _id:'temporal',
            users:[userId,targetId],
            messages:[]
        });

        this.addIndexUserChat(users,key);

        this._list.set(key,newChat);
     return this.getChat(userId,targetId);
    }

    getChat(userId,targetId){
        const users = [userId,targetId]
        const key = this.generateKey(users);
        const findChat = this._list.get(key);
        if(findChat) return findChat
    }

    getAllChatByUserId(userId){
        const chat = this._chatIndexUser.get(userId)
        if(chat && chat.size) return Array.from(chat).map((key)=> this._list.get(key));
        return []
    }

    addIndexUserChat(users,key){
        users.forEach(userId => {
            if(!this._chatIndexUser.has(userId))
            this._chatIndexUser.set(userId,new Set());

            this._chatIndexUser.get(userId).add(key);
        });
    }

    generateKey(users){
        return users.sort().join("-");
    }

    async saveInDatabase(payload){
        const {chat} = payload;
        const key = this.generateKey(chat.users);
        let context = this;
        const callback =  (data) =>{
            const copyChat = JSON.parse(JSON.stringify(data))
            context.addChat(copyChat)
        }
        if(chat){
            await createChatMongoDb(payload,callback)
        } 
        let newChat = this._list.get(key);
        newChat = newChat.mapper();
        return newChat       
    }
}

export default new ListChat()