import { PhysicianFavoritePatient } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js"; // Asumiendo que esto es una clase de error personalizada

const deletePhysicianFavoritePatientHandler = async (body) => {
    const {
        physicianId,
        patientId,
    } = body;
    const sequelize = PhysicianFavoritePatient.sequelize; // Asumiendo que la conexión está asociada al modelo
    const transaction = await sequelize.transaction();

    try {
        const deletedRows = await PhysicianFavoritePatient.destroy({
            where: {
                physicianId: physicianId,
                favoritePatient: patientId
            },
            transaction,
        });

        if (deletedRows === 0) {
            throw new SegimedAPIError('No se encontró la relación a eliminar.', 404);
        }

        await transaction.commit();
        return { success: true, message: 'Relación eliminada correctamente.' };

    } catch (error) {
        await transaction.rollback();
        new SegimedAPIError('Error al eliminar la relacion.', 404);
        return { success: false, /*message: error.message */};
    }
};

export default deletePhysicianFavoritePatientHandler;
