class Message{
    constructor(sender,target,text){
        this.sender = sender;
        this.target = target;
        this.text = text;
        this.state= false;
        this.date = new Date();
        this._id = `Message-${target._id}-${this.date.getTime()}`;
    }

    markAsSeen(){
        this.state= true;
    }

}

export default Message