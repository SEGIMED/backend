import models from '../../databaseConfig.js'

const getPatientsHandler = async () => {
  try {
    const getPatients = await models.User.findAll({
      where:{
        role:3
      },
      attributes: {
        exclude: ['password','cellphone', 'email']
      }
    });
    return getPatients;
  } catch (error) {
    throw new Error("Error loading patients: " + error.message);
  }
};

export default getPatientsHandler;
