import mongoose from "mongoose";

const { Types,Schema,model,models } = mongoose;

const schemaChat = new Schema({
    users:[{type: Number}],
    messages:[{type: Types.ObjectId, ref:"Message"}],
})

schemaChat.statics.findByUserId = function(userId) {
    return this.find({ users: userId });
};

schemaChat.methods.addMessage = function(message) {
    this.messages.push(message);
};

schemaChat.methods.addUser = function(userId) {
    this.users.push(userId);
};

export default models.Chat || model("Chat",schemaChat);