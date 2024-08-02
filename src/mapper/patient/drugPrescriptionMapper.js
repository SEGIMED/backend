export const mapDrugPrescription = (drugPrescription) => {
  // return {
  //   id: drugPrescription.id,
  //   prescriptionTimestamp: drugPrescription?.prescriptionTimestamp,
  //   prescribedDose: drugPrescription.prescribedDose,
  //   quantity: drugPrescription.quantity,
  //   // drugName: drugPrescription.catDrug.name,
  //   drugName: drugPrescription.dataValues.drugName,
  //   drugComposition: drugPrescription.catDrug.composition,
  //   // drugPresentation: drugPrescription.catDrug.catDrugPresentation.name,
  //   drugDefaultDose: drugPrescription.catDrug.defaultDose,
  // };
  return drugPrescription.dataValues.drugName; //por el momento el fron solo necesita el string para agruparlo en el array
};
