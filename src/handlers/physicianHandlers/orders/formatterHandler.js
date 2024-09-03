import SegimedAPIError from "../../../error/SegimedAPIError.js";

export const formatterHandler = (array) => {
  try {
    return array.map(
      ({
        patientId,
        physicianId,
        orderTypes,
        medicalPrescriptionId,
        indications,
        diagnostic,
        additionalText,
        date,
        patient,
        physician,
        medicalReq,
        medicationPrescription, // La primera instancia de medicationPrescription
      }) => {
        const {
          startTimestamp,
          medicationPrescription: prescriptionModifications, // La segunda instancia de medicationPrescription
        } = medicationPrescription;

        return {
          patientId,
          physicianId,
          orderTypes,
          medicalPrescriptionId,
          indications,
          diagnostic,
          additionalText,
          date,
          patient: formatFullName(patient),
          physician: formatFullName(physician),
          medicalReq: medicalReq.reqTypes,
          startTimestamp,
          prescriptionModifications: formatPrescriptionModifications(
            prescriptionModifications
          ), // Formateamos las modificaciones
        };
      }
    );
  } catch (error) {
    throw new SegimedAPIError("Error en el formateo", error);
  }
};

const formatFullName = ({ name, lastname }) => `${name} ${lastname}`;

const formatPrescriptionModifications = (modification) =>
  modification.map((modification) => ({
    modificacionId: modification.id,
    modificationTimestamp: modification.modificationTimestamp,
    observations: modification.observations,
    indications: modification.indications,
    drugDetail: formatDrugDetail(modification.drugDetailPresentation),
  }));

const formatDrugDetail = ({ drugName, dose, measureUnit }) =>
  `${drugName.name} ${dose} ${measureUnit.name}`;
