import { encryptDataIv,descryptDataIv } from "../../../../utils/cryptojs/secureEncrypt";
class Message{
    constructor(sender,target,text){
        this.sender = sender;
        this.target = target;
        this.text = text;
        this.state= false;
        this.date = new Date();
        this._id = `Message-${target._id}-${this.date.getTime()}`;
        this.encryptMessage()
    }

    markAsSeen(){
        this.state= true;
    }


    encryptMessage(){
       this.text =  encryptDataIv(this.text);
    }

    decryptMessage(){
        return descryptDataIv(this.text);
    }

}

export default Message