import models from '../../databaseConfig.js'

const regexPositiveNumbers = /^[1-9][0-9]*$/;

const deleteSchedulingtHandler = async (id) => {
    if(!regexPositiveNumbers.test(id)){
        throw new Error ('El id del evento debe ser un entero positivo')
      } 
    try {
        const scheduleToDelete = await models.AppointmentScheduling.destroy({
            where:{
                id:id
            }
        });
        
        return 'Cita eliminada satisfactoriamente'
    } catch (error) {
        throw new Error("Error eliminando el evento: " + error.message)
    }
}

export default deleteSchedulingtHandler;