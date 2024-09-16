import models from "../../../databaseConfig.js";

const getBackgroundTabHandler = async ({id}) => {
    try {
        const medicalEvent =await models.MedicalEvent.findByPk(id,
            
        )
        const background = await models.Backgrounds.findOne({
            where:{
                medicalEvent: id
            },
            include:{
                model: models.User,
                as:"patientUser",
                include: [
                    {
                      model: models.SociodemographicDetails,
                      as: "socDemDet",
                      attributes: ["birthDate", "dateOfDeathReport"],
                    },
                    {
                      model: models.PatientPulmonaryHypertensionGroup,
                      as: "userHpGroups",
                      attributes: ["id"],
                      include: {
                        model: models.CatPulmonaryHypertensionGroup,
                        as: "catHpGroup",
                        attributes: ["name"],
                      },
                    },
                    {
                      model: models.PatientCardiovascularRisk,
                      as: "ptCvRsks",
                      attributes: ["risk"],
                      include: {
                        model: models.CatCardiovascularRisk,
                        as: "catCvRisk",
                        attributes: ["name"],
                      },
                    },
                    {
                      model: models.PatientSurgicalRisk,
                      as: "patSgRisks",
                      attributes: ["timestamp"],
                      include: {
                        model: models.CatSurgicalRisk,
                        as: "catSurgicalRisk",
                        attributes: ["name"],
                      },
                    },
                  ],
            }
        }) 
        return background
    } catch (error) {
        throw new Error("Ocurrió un error al recuperar los antecedentes: " + error.message);
        
    }
}
export default getBackgroundTabHandler