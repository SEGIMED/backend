import mongoose from "mongoose";

const { Types,Schema,model,models } = mongoose;

const schemaMessageGroup = new Schema({
    text: {
        type: String
    },
    sender:{
        type: Types.ObjectId
    },
    seenUsers:[{type:Types.ObjectId, ref: "User"}],
    state: Boolean,
    Date: Date
});


schemaMessageGroup.methods.markSeenUser = function(id){
    this.seenUsers.push(id);
    return this.save();
}

schemaMessageGroup.methods.markAsSeen = function() {
    this.state = true;
    return this.save();
};


export default models.MessageGroup || model("MessageGroup",schemaMessageGroup);