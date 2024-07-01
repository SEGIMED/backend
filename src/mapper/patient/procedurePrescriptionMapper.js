
export const mapProcedurePrescription = (procedurePrescription) => {
    return {
        id: procedurePrescription.id,
        prescriptionTimestamp: procedurePrescription.prescriptionTimestamp,
        procedureType: procedurePrescription.catMedicalProcedure.catMedicalProcedureType.name,
        procedureName: procedurePrescription.catMedicalProcedure.name,
        procedureCode: procedurePrescription.catMedicalProcedure.procedureCode
    }
}
