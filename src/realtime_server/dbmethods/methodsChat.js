import ChatModel from "../models/Chat.js";
import MessageModel from "../models/Message.js";
import { createMessage } from "./methodsMessages.js";

export async function getAllChatsWithPopulate() {
  try {
    const chats = await ChatModel.find({}).sort({ lastMessage: -1 }).populate({
      path: "messages",
      populate: {
        path: "sender target",
        select: "-notify",
      },
    });

    // console.log(chats);
    if (chats && chats.length) return chats;
    throw new Error("No chats found");
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getChatWithPopulate(userId, targetId) {
  try {
    const findChat = await ChatModel.findOne({
      users: { $all: [userId, targetId] },
    })
      .populate({
        path: "messages",
        populate: { path: "sender target", select: "-notify" },
      })
      .exec();
    if (findChat) return findChat;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createChatMongoDb(data, cb) {
  // Crear una nueva instancia de Chat
  const {chat,lastMessage} = data;
  try {
    let newchat;
    if (chat._id === "temporal") {
      newchat = new ChatModel({
        users: chat.users,
        messages: [],
      });
    } else {
      newchat = await ChatModel.findOne({ _id: chat._id });
    }

    // Agregar los mensajes
    if (lastMessage?._id.startsWith("Message-")) {
      const newMessage = new MessageModel({
                sender: lastMessage.sender._id,
                target: lastMessage.target._id,
                text: lastMessage.text,
                state: lastMessage.state,
                date: lastMessage.date,
              });
              await newMessage.save();
              newchat.addMessage(newMessage._id);
    }
      
    // await Promise.all(
    //   data.unseenMessages.map(async (message) => {
    //     if (message._id.startsWith("Message-")) {
    //       const newMessage = new MessageModel({
    //         sender: message.sender._id,
    //         target: message.target._id,
    //         text: message.text,
    //         state: message.state,
    //         date: message.date,
    //       });
    //       await newMessage.save();
    //       console.log("se ha creado este mensaje", newMessage);
    //       chat.addMessage(newMessage._id);
    //     }
    //   })
    // );

    // Guardar el chat en la base de datos
    await newchat.save();

    // Llamar al callback con el chat guardado
    const chatWithPopulate = await getChatWithPopulate(
      newchat.users[0],
      newchat.users[1]
    );
    cb(chatWithPopulate);
  } catch (error) {
    console.log(error.message);
  }
}
