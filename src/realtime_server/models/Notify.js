import mongoose from "mongoose";

const {Types,Schema, model, models } = mongoose;


const schemaNotify = new Schema({
    content: {
        type: Object
    },
    sender: {
        type: Types.ObjectId,
        ref:"User",
        default: null
    },
    target:{
        type:Number,
        ref:"User"
    },
    state: {
        type: Boolean,
        default: false 
    },
    date:{ 
        type:Date,
        default: Date.now}
});

schemaNotify.methods.markAsSeen = function() { //If the status is true, then the notification has been viewed.
    this.state = true;
    return this.save();
};

export default models.Notify || model("Notify",schemaNotify);