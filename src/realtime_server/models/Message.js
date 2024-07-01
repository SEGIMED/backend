import mongoose from "mongoose";

const { Types,Schema,model,models } = mongoose;

const schemaMessage = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: "User"
    },
    target:{
        type: Types.ObjectId,
        ref: "User"
    },
    text:{
        type:String
    },
    state:{
        type:Boolean
    } ,
    date: {
        type: Date
    }
})

schemaMessage.methods.markAsSeen = function() {
    this.state = true;
    return this.save();
};

export default models.Message || model("Message",schemaMessage);
