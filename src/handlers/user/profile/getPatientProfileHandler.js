import models from "../../../databaseConfig.js";

const getPatientProfileHandler = async ({ id, role }) => {
  try {
    const user = await models.User.findByPk(id,{
        attributes:{
            exclude: ["idType", "password", "role", "verified","nacionality","currentLocation"]
        },
        include:{
            model: models.SociodemographicDetails,
            as:"socDemDet",
            attributes:["genre"],
            include:{
                model: models.CatGenre,
                as:"catGenre"
            }
        }
    });
    console.log(user)
    return user;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar los datos del paciente: " + error.message
    );
  }
};
export default getPatientProfileHandler;
