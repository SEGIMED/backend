

export const ServerListenners = {
    //Listenners 
    onConnected: "connection",
    onDisconnect: "disconnect",
    onJoin: "onJoin", // ya
    joinGroupChat:"joinGroupChat",//ya
    getListUsers: "getListUser",
    setCloseRoom: "setCloseRoom",//ya
    sendMessage: "sendMessage", //ya
    sendInvite: "sendInvite",  //ya
    messageSeen:"messageSeen", //ya
    getChatMessages: "getChatMessages", //ya
    createGroupChat: "createGroupChat", //ya
    sendGroupMessage:"sendGroupMessage",  //ya
    getUsersConnected:"getUsersConnected",
    createChat:"createChat"
}

 
export const  ClientListenners = {
    //Listenners to Clients.
    getHistoryChats: "getHistoryChats", //ya
    onPart: "onPart", // listen when a user leaves a Room
    onJoin: "onJoin", // listen when a user connects to a Room
    updateMessage:"updateMessage", // listens when a message is sent. //ya
    updateChatMessages:"updateChatMessages", // listens for an update ChatMessage //ya
    updateChatGroupMessages:"updateChatGroupMessages", //listens for an update Message //ya
    listGroup:"listGroup", // listens for list  group of Chats //ya
    invite:"invite", //listens when invited. // ya
    deleteGroup:"deleteGroup", // listens when a group is deleted //ya
    updateNotify:"updateNotify", //ya
    listUsersConnected:"listUsersConnected",
    updateNewChat:"updateNewChat"
}


