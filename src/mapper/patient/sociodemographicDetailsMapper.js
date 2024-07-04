export const mapSociodemographicDetails = (sociodemographicDetails) => {
    return {
        birthDate: sociodemographicDetails.birthDate || null,
        genre: sociodemographicDetails.catGenre ? sociodemographicDetails.catGenre.name : null,
        educationalLevel: sociodemographicDetails.catEducationalLevel ? sociodemographicDetails.catEducationalLevel.name : null,
        profession: sociodemographicDetails.profession ? sociodemographicDetails.profession.name : null,
        civilStatus: sociodemographicDetails.catCivilStatus ? sociodemographicDetails.catCivilStatus.name : null,
        address: sociodemographicDetails.address || null,
        healthCarePlan: sociodemographicDetails.catHealthCarePlan ? sociodemographicDetails.catHealthCarePlan.name : null,
        emergencyContactPhone: sociodemographicDetails.emergencyContactPhone || null,
        healthCareNumber: sociodemographicDetails.healthCareNumber || null,
        isAlive: sociodemographicDetails.dateOfDeathReport === null
    };
};

