import models from '../../databaseConfig.js';

const getAllUsersHandler = async()=>{
    try {
        const allUsers = await models.User.findAll({
          attributes: {
            exclude: ['password','cellphone', 'email']
          }
        });
        return allUsers;
      } catch (error) {
        throw new Error("Error loading users: " + error.message);
      }
};

export default getAllUsersHandler