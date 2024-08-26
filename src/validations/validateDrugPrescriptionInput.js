export const validateDrugPrescriptionInput = (input) => {
  const { drugDetailPresentationId, drugCreation, prescriptionCreation } =
    input;

  if (!drugDetailPresentationId && !drugCreation) {
    throw new Error(
      "Either 'drugDetailPresentationId' or 'drugCreation' must be provided."
    );
  }

  if (!prescriptionCreation) {
    throw new Error("'prescriptionCreation' must be provided.");
  }

  const requiredFields = ["doseMeasure", "timeMeasure", "timeMeasureType"];

  for (const field of requiredFields) {
    if (!prescriptionCreation[field]) {
      throw new Error(
        `'${field}' is a required field in 'prescriptionCreation'.`
      );
    }
  }
};
