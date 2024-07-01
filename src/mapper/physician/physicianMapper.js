export const mapPhysician = (physician) => {
    const attendancePlaces = physician.physicianAttendancePlaces;
    const lastAttendancePlace = attendancePlaces[attendancePlaces.length - 1];

    const medicalRegistries = physician.physicianMedicalRegistries.reduce((acc, medRegistry) => {
        acc[medRegistry.medicalRegistrationType.name] = {
            id: medRegistry.id,
            registryId: medRegistry.registryId,
            registryType: medRegistry.medicalRegistrationType.name
        };
        return acc;
    }, {});

    return {
        userId: physician.id,
        name: physician.name,
        lastname: physician.lastname,
        specialties: physician.physicianSpecialties.map(specialty => specialty.specialty),
        nationality: physician.userNationality.nationality,
        currentLocationCity: physician.currentLocationUser ? physician.currentLocationUser?.city : null,
        currentLocationCountry: physician.currentLocationUser ? physician.currentLocationUser?.country : null,
        medicalRegistries: medicalRegistries,
        attendancePlace: lastAttendancePlace ? {
            id: lastAttendancePlace.id,
            googleMapsLink: lastAttendancePlace.googleMapsLink,
            addressDetails: lastAttendancePlace.addressDetails,
            alias: lastAttendancePlace.alias
        } : null,
        patientsInFollowUp: new Set(physician.physicianScheduling.filter(scheduling => scheduling.medicalEvent !== null).map(scheduling => scheduling.patient)).size,
        reviewsScore: physician.physicianDetails ? physician.physicianDetails.reviewsScore : null,
        expertiseLevel: physician.physicianDetails ? physician.physicianDetails.physicianExpertiseLevel : null,
        cellphone: physician.cellphone,
        email: physician.email,
        avatar: physician.avatar
    };
};
