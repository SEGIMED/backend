import mongoose from "mongoose";

const { Types,Schema,model,models } = mongoose;


const userSchema = new Schema({
    fullName:{
        type: String
    },
    role:{
        type: String
    },
    avatar:{
        type:String
    },
    userId:{
        type:Number,
        unique:true
    },
    nationality:{
        type: String
    },
    notify:[{type: Types.ObjectId, ref:"Notify"}]
});

userSchema.methods.addNotify = async function(id) {
    this.notify.push(id);
    await this.save();
};


export default models.User || model("User",userSchema);