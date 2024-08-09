import { getDataConsult } from "../../../dbmethods/methodsConsult.js";

export class Room{
    constructor(){
        this.key = null;
        this.users= null;
        this.id = null;
        this.offer= null;
        this.asw = null;
        this.candidate = [];
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
       this.patient = {...obj.patient,state:"Esperando"}
       this.physician = {...obj.physician,state:"Esperando"}
    };




}