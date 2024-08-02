/*
No son buenas practicas pero si quiero cambiar las drugs de un medical Event necesito eliminar las que
fueron cargadas anteriormente.
*/
import { DrugPrescription } from "../../databaseConfig.js"; // Asegúrate de importar correctamente tu modelo
import SegimedAPIError from "../../error/SegimedAPIError.js"; // Importa tu clase de error personalizada si tienes una

const deleteDrugPrescriptionsHandler = async (medicalEventId) => {
  try {
    // Verificar si existen prescripciones para el medicalEventId
    const prescriptionCount = await DrugPrescription.count({
      where: {
        medicalEvent: medicalEventId,
      },
    });

    if (prescriptionCount === 0) {
      return { message: `no tenemos registros para eliminar.` };
    }

    // Eliminar las prescripciones si existen
    const deletedCount = await DrugPrescription.destroy({
      where: {
        medicalEvent: medicalEventId,
      },
    });

    return { message: `${deletedCount} registros eliminados correctamente.` };
  } catch (error) {
    console.error(error.message);
    throw new SegimedAPIError(
      "Error al eliminar los registros: " + error.message,
      500
    );
  }
};

export default deleteDrugPrescriptionsHandler;
