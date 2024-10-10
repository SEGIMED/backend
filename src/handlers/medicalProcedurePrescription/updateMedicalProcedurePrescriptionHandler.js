import { MedicalProcedurePrescription } from "../../databaseConfig.js";

const updateMedicalProcedurePrescriptionHandler = async ({
  id,
  medicalProcedures,
  transaction,
}) => {
  try {
    if (!id || !Array.isArray(medicalProcedures)) {
      throw new Error(
        "Se debe proporcionar el id del evento médico y un array de procedimientos."
      );
    }

    const existingProcedures = await MedicalProcedurePrescription.findAll({
      where: { medicalEvent: id },
      transaction,
    });

    const existingProcedureNames = existingProcedures.map(
      (proc) => proc.medicalProcedureName
    );

    const proceduresToAdd = medicalProcedures.filter(
      (proc) => !existingProcedureNames.includes(proc)
    );
    const proceduresToRemove = existingProcedures.filter(
      (proc) => !medicalProcedures.includes(proc.medicalProcedureName)
    );

    if (proceduresToRemove.length > 0) {
      const idsToRemove = proceduresToRemove.map((proc) => proc.id);
      await MedicalProcedurePrescription.destroy({
        where: { id: idsToRemove },
        transaction,
      });
    }

    for (const procedureName of proceduresToAdd) {
      await MedicalProcedurePrescription.create(
        {
          medicalProcedureName: procedureName,
          medicalEvent: id,
          prescriptionTimestamp: new Date(),
        },
        { transaction }
      );
    }

    return true;
  } catch (error) {
    throw new Error("Hubo un error durante el proceso: " + error.message);
  }
};

export default updateMedicalProcedurePrescriptionHandler;
