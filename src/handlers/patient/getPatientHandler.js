import {User, UserCurrentLocation} from '../../databaseConfig.js'

const regexPositiveNumbers = /^[1-9][0-9]*$/;

const getPatientHandler = async (id) => {
  try {
    if(!regexPositiveNumbers.test(id)){
      throw new Error ('El id del usuario debe ser un entero positivo')
    } 

    const getPatient = await User.findOne({
      where:{
        id:id,
        role:3
      },
      attributes: {
        exclude: ['password', 'cellphone','email','currentLocation']
      },
      include:[ 
        {
          model: UserCurrentLocation,
          as: 'currentLocationUser',
          attributes: {
            exclude: ['id','user']
          }
      },
      ]
    
    });
    if(!getPatient) throw new Error("Paciente no encontrado");
    return getPatient
  } catch (error) {
    throw new Error("Error cargando el paciente: " + error.message);
  }
};

export default getPatientHandler;
