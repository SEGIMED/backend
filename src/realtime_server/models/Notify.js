import mongoose from "mongoose";

const {Types,Schema, model, models } = mongoose;


const schemaNotify = new Schema({
    content: {
        type: Object
    },
    sender: {
        type: Types.ObjectId,
        ref:"User"
    },
    target:{
        type: Types.ObjectId,
        ref:"User"
    },
    state: Boolean,
    date: Date
});

schemaNotify.methods.markAsSeen = function() {
    this.state = true;
    return this.save();
};

export default models.Notify || model("Notify",schemaNotify);