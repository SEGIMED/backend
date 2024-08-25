import models from "../../databaseConfig.js";

const regexPositiveNumbers = /^[1-9][0-9]*$/;

const deleteSchedulingHandler = async (id) => {
  if (!regexPositiveNumbers.test(id)) {
    throw new Error("El id del evento debe ser un entero positivo");
  }
  try {
    const [affectedRows] = await models.AppointmentScheduling.update(
      { schedulingStatus: 5 }, // Cambiar el estado a 5 para el borrado lógico
      {
        where: {
          id: id,
        },
      }
    );

    // Verificar si se actualizó algún registro
    if (affectedRows === 0) {
      throw new Error("No se encontró ningún evento con el ID proporcionado.");
    }

    return "Cita eliminada satisfactoriamente";
  } catch (error) {
    throw new Error("Error eliminando el evento: " + error.message);
  }
};

export default deleteSchedulingHandler;
