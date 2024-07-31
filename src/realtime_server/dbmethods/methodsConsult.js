import {
    AppointmentScheduling,
    User,
    PatientPulmonaryHypertensionRisk,
    CatPulmonaryArterialHypertensionRisk,
   } from "../../databaseConfig.js";



export async function getDataConsult(id){
    try {
        if(!id) throw new Error('Id is undefined');
        const consultData = await AppointmentScheduling.findOne({
            where: {id:id},
            include: [
              {
                model: User,
                as: "patientUser",
                attributes: ["name", "lastname", "avatar"],
                include: [
                  {
                    model: PatientPulmonaryHypertensionRisk,
                    as: "patientPulmonaryHypertensionRisks",
                    include: {
                      model: CatPulmonaryArterialHypertensionRisk,
                      as: "catHpRisk",
                      attributes: ["name"],
                    },
                  },
                ],
              },
      
              {
                model: User,
                as: "physicianThatAttend",
                attributes: ["name", "lastname", "avatar"],
              },
            ],
          });
          console.log(consultData);

        
    } catch (error) {
        console.log(error.message)
    }
}

