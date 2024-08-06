import Message from "../models/Message.js";
import Notify from "../models/Notify.js";
import { getChatWithPopulate } from "./methodsChat.js";

export async function createMessage(data){
    try {
        const newMessage = await  new Message(data);
        await newMessage.save()

        if(newMessage) {
            //TODO test the notification
            const newNotification = new Notify({
                content: {
                  notificationType:"unreadMessage",
                },
                sender: newMessage.sender.userId,
                target: newMessage.target.userId
              });
              newNotification.save();

            return newMessage
        }

        throw new Error('Error to Create the Message');
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function markAsSeen(messages,cb,users){
    try {
        const newMessages= Promise.all (messages.map(async message =>{
          
        const findMessage= await Message.findOne({_id:message._id})
        if(findMessage) {
            await findMessage.markAsSeen()
            return findMessage
            }
            
        }))
        const chat= await getChatWithPopulate(users[0] , users[1])
        if(chat) cb(chat.messages)
       
    } catch (error) {
        console.log(error);
        return null;
    }
}