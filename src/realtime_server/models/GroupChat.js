import mongoose from "mongoose";

const { Types,Schema,model,models } = mongoose;

const schemaGroupChat = new Schema({
    name: String,  // El nombre del grupo
    users:[{type: Number}],  // Los usuarios en el grupo
    messages:[{type: Types.ObjectId, ref:"MessageGroup"}],  // Los mensajes en el grupo
    owner: Number
})

schemaGroupChat.statics.findByUserId = function(userId) {
    return this.find({ users: userId });
};

schemaGroupChat.methods.addMessage = function(message) {
    this.messages.push(message);
    return this.save();
};

schemaGroupChat.methods.addUser = function(userId) {
    this.users.push(userId);
    return this.save();
};

schemaGroupChat.methods.removeUser = function(userId) {
    this.users = this.users.filter((user) => user != userId);
    return this.save();
};

export default models.GroupChat || model("GroupChat",schemaGroupChat);
