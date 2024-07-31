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
        } catch (error) {
            console.log(error.message)
            return error
        }
    }

}