import { getDataConsult } from "../../../dbmethods/methodsConsult.js";

export  class Room{
    constructor(id){
      this.id = id;
      this.patient=null;
      this.physician=null;
    }

    join(userObj){
        if(userObj.role === 'Médico'){
            this.physician = userObj
            this.physician.state ="Configurando Dispositivo";
        } else {
            this.patient = userObj;
            this.patient.state ="Configurando Dispositivo"
        }
    }

    setState(userData,state){
        if(userData.role === 'Médico' && this.physician){
            this.physician.state = state;
        } else if(this.patient) {
            this.patient.state = state;
        }

        return this;
    }


    // async getData(id){
    //     try {
    //         const result = await getDataConsult(id);

    //         if(result) this.assignData(result)
                
    //         return this

    //     } catch (error) {
    //         console.log(error.message)
    //         return error
    //     }
    // }


    // assignData(obj){
    //    this.key=obj.users.sort().join("-"); 
    //    this.id=obj.id
    //    this.users=obj.users
    //    this.patient = {...obj.patient,state:false}
    //    this.physician = {...obj.physician,state:false}
    // };

    // setUserState(id,value){
    //     this.patient.id === id ? this.patient.state = value : this.physician.state = value;
    // }




}