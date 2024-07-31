import { getDataConsult } from "../../../dbmethods/methodsConsult.js";

export class Room{
    constructor(){
        this.key = null;
        this.users= null;
        this.id = null;
    }

    async getData(id){
        try {
            const result = await getDataConsult(id);

            if(result) this.assignData(result)
                
            return this

        } catch (error) {
            console.log(error.message)
            return error
        }
    }
    assignData(obj){
       this.key=obj.users.sort().join("-"); 
       this.id=obj.id
       this.users=obj.users

    };




}