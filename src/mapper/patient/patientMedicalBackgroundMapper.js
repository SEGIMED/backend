export const mapPatientMedicalBackground = (medicalBackground) => {
    return {
        disease : medicalBackground.catDisease.name,
        medicalBackgroundType : medicalBackground.medicalBackgroundType.name,
        description : medicalBackground.description,
        }
}