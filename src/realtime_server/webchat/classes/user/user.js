
class User{
    constructor({_id,fullName,avatar,role,userId,nationality,notify=[]}){
        this._id=_id,
        this.fullName=fullName
        this.avatar=avatar,
        this.role=role,
        this.userId=userId,
        this.nationality=nationality
        this.notify = notify
    }
    addNotify(notify){
        this.notify.push(notify);
    }

    setId(id){
        this._id= id;
    }
}

export default User