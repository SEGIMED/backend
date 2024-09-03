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
                attributes: ["name", "lastname", "avatar","role","id"],
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
                attributes: ["name", "lastname", "avatar","role","id"],
              },
            ],
          });
          const {patient, physician} = consultData.dataValues

          return {id, users:[patient,physician], patient:consultData.dataValues.patientUser.dataValues, physician:consultData.dataValues.physicianThatAttend.dataValues}
        
    } catch (error) {
        console.log(error.message)
    }
}

