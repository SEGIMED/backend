import UserModel from "../../models/user.js";
import ChatModel from "../../models/Chat.js";

export async function formatDataChat(chat,userId,populate=true) {
   let findChat = chat;
    if(populate){
     findChat = await ChatModel.findOne({ _id: chat._id }).populate({
        path: "messages",
        populate: {
          path: "sender target",
          select: "-notify",
        },
      });
    }

    let chatObj = findChat.toObject();
  chatObj.seenMessages = chatObj.messages.filter((message) => message?.state);
  chatObj.unseenMessages = chatObj.messages.filter((message) => !message?.state);

  delete chatObj.messages;
  let target = chatObj.users.find((id) => id != userId);
  target = await UserModel.findOne({ userId: target }, { notify: 0 });
  chatObj.target = target;
  return chatObj;


}

export function formatDataChatGroup(chat) {
  let chatObj = chat.toObject();
  chatObj.seenMessages = chatObj.messages.filter((message) => message?.state);
  chatObj.unseenMessages = chatObj.messages.filter(
    (message) => !message?.state
  );
  delete chatObj.messages;
  return chatObj;
}
