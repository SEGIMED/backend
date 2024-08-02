import Message from "../models/Message.js";
import Notify from "../models/Notify.js";

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

export async function markAsSeen(_id){
    try {
        const message = await Message.findOne({_id:_id});
        if(message) await message.markAsSeen();
    } catch (error) {
        console.log(error);
        return null;
    }
}