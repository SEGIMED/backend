class Notify{
    constructor(){
        this._id='temporal';
        this.content = {} 
        this.sender = null;
        this.target = null;
        this.state = false;
        this.date= new Date();
    }

    addSender(user){
        this.sender = user;
    }
    addTarget(user){
        this.target = user;
    }
    seenNotify(){
        this.state=true;
    }
    addContent(content){
        this.content = content;
    }
    addId(id){
        this._id = id;
    }
}