export const mapDrugPrescription = (drugPrescription) => {
  return {
    id: drugPrescription.id,
    prescriptionTimestamp: drugPrescription.prescriptionTimestamp,
    prescribedDose: drugPrescription.prescribedDose,
    quantity: drugPrescription.quantity,
    //drugName: drugPrescription.catDrug.name,
    drugName: drugPrescription.drugName,
    drugComposition: drugPrescription.catDrug.composition,
    drugPresentation: drugPrescription.catDrug.catDrugPresentation.name,
    drugDefaultDose: drugPrescription.catDrug.defaultDose,
  };
};
