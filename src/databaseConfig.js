import { Sequelize } from "sequelize";
import cls from 'cls-hooked'

import AnthropometricDetailsModel from "./models/AnthropometricDetails.js";
import AppointmentSchedulingModel from "./models/AppointmentScheduling.js";
import CatAnthropometricMeasureTypeModel from "./models/CatAnthropometricMeasureType.js";
import CatAppointmentModalityModel from "./models/CatAppointmentModality.js";
import CatChatStatusModel from "./models/CatChatStatus.js";
import CatDiagnosticTestTypeModel from "./models/CatDiagnosticTestType.js";
import CatIdTypeModel from "./models/CatIdType.js";
import CatMeasureUnitModel from "./models/CatMeasureUnit.js";
import CatMedicalSpecialtyModel from "./models/CatMedicalSpecialty.js";
import CatRoleModel from "./models/CatRole.js";
import CatSchedulingStatusModel from "./models/CatSchedulingStatus.js";
import CatVitalSignMeasureTypeModel from "./models/CatVitalSignMeasureType.js";
import CatWeekDayModel from "./models/CatWeekDay.js";
import ChatModel from "./models/Chat.js";
import ChatMessageModel from "./models/ChatMessage.js";
import ChatUserModel from "./models/ChatUser.js";
import DiagnosticTestModel from "./models/DiagnosticTest.js";
import DiagnosticTestPrescriptionModel from "./models/DiagnosticTestPrescription.js";
import DrugPrescriptionModel from "./models/DrugPrescription.js";
import MedicalEventModel from "./models/MedicalEvent.js";
import OneTimePasswordModel from "./models/OneTimePassword.js";
import PhysicianAgendaConfigurationModel from "./models/PhysicianAgendaConfiguration.js";
import PhysicianSpecialtyModel from "./models/PhysicianSpecialty.js";
import SociodemographicDetailsModel from "./models/SociodemographicDetails.js";
import UserModel from "./models/User.js";
import VitalSignDetailsModel from "./models/VitalSignDetails.js";
import PhysicianDetailsModel from "./models/PhysicianDetails.js";
import CatCityModel from "./models/CatCity.js";
import CatCountryModel from "./models/CatCountry.js";
import PhysicianAttendancePlaceModel from "./models/PhysicianAttendancePlace.js";
import PhysicianMedicalRegistryModel from "./models/PhysicianMedicalRegistry.js";
import CatMedicalRegistrationTypeModel from "./models/CatMedicalRegistrationType.js";
import RequestPatientContactModel from "./models/RequestPatientContact.js";
import CatProvinceModel from "./models/CatProvince.js";
import CatDiseaseModel from "./models/CatDisease.js";
import CatDrugModel from "./models/CatDrug.js";
import CatDrugPresentationModel from "./models/CatDrugPresentation.js";
import CatMedicalBackgroundTypeModel from "./models/CatMedicalBackgroundType.js";
import CatMedicalProcedureModel from "./models/CatMedicalProcedure.js";
import CatMedicalProcedureTypeModel from "./models/CatMedicalProcedureType.js";
import MedicalIndicationsModel from "./models/MedicalIndications.js";
import MedicalProcedurePrescriptionModel from "./models/MedicalProcedurePrescription.js";
import MedicalReferralModel from "./models/MedicalReferral.js";
import PatientDiagnosticModel from "./models/PatientDiagnostic.js";
import PatientMedicalBackgroundModel from "./models/PatientMedicalBackground.js";
import TherapyPrescriptionModel from "./models/TherapyPrescription.js";
import CatTherapyModel from "./models/CatTherapy.js";
import CatCivilStatusModel from "./models/CatCivilStatus.js";
import CatGenreModel from "./models/CatGenre.js";
import CatEducationalLevelModel from "./models/CatEducationalLevel.js";
import CatHealthCarePlanModel from "./models/CatHealthCarePlan.js";
import CatPhysicalSubsystemModel from "./models/CatPhysicalSubsystem.js";
import PatientPhysicalExaminationModel from "./models/PatientPhysicalExamination.js";
import PhysicianReviewModel from "./models/PhysicianReview.js"
import CatPhysicianExpertiseLevelModel from "./models/CatPhysicianExpertiseLevel.js";
import PatientReviewModel from "./models/PatientReview.js";
import LoginRecordModel from "./models/LoginRecord.js";
import PatientCardiovascularRiskModel from "./models/PatientCardiovascularRisk.js";
import CatCardiovascularRiskModel from "./models/CatCardiovascularRisk.js";
import PatientHeartFailureClassificationModel from "./models/PatientHeartFailureClassification.js";
import CatHeartFailureClassificationModel from "./models/CatHeartFailureClassification.js";
import PatientPulmonaryHypertensionRiskModel from "./models/PatientPulmonaryHypertensionRisk.js";
import CatPulmonaryArterialHypertensionRiskModel from "./models/CatPulmonaryArterialHypertensionRisk.js";
import CatPainAreasModel from "./models/CatPainAreas.js";
import CatPainDurationModel from "./models/CatPainDuration.js";
import CatPainFrequencyModel from "./models/CatPainFrequency.js";
import CatPainScaleModel from "./models/CatPainScale.js";
import CatPainTypeModel from "./models/CatPainType.js";
import PatientPainMapModel from "./models/PatientPainMap.js";
import PatientPulmonaryHypertensionGroupModel from "./models/PatientPulmonaryHypertensionGroup.js";
import CatPulmonaryHypertensionGroupModel from "./models/CatPulmonaryHypertensionGroup.js";
import CatSurgicalRiskModel from "./models/CatSurgicalRisk.js";
import PatientSurgicalRiskModel from "./models/PatientSurgicalRisk.js";
import UserCurrentLocationModel from "./models/UserCurrentLocation.js"
import AlarmEventModel from "./models/AlarmEvent.js"
import ProvisionalPreConsultationModel from "./models/ProvisionalPreConsultation.js"
import BackgroundsModel from "./models/Backgrounds.js";
import DoctorScheduleModel from "./models/DoctorSchedule.js";
import CatCenterAttetionModel from "./models/CatCenterAttention.js";
import PhysicianFavoritePatientModel from './models/PhysicianFavoritePatient.js';

//JUST USE FOR LOCAL ENVIRONMENT WITHOUT NODEMON
// import { URL } from 'url';
// import { config } from "dotenv";
//
//
// config({ path: new URL('./../.env', import.meta.url).pathname });
//JUST USE FOR LOCAL ENVIRONMENT WITHOUT NODEMON

const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_TRANSACTIONS_CLS_NAMESPACE } = process.env;
const clsDBTransactionsNamespace = cls.createNamespace(DATABASE_TRANSACTIONS_CLS_NAMESPACE);
Sequelize.useCLS(clsDBTransactionsNamespace);

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/segimed`,
    {
        logging: false,
        native: false,
        timezone: 'America/Argentina/Buenos_Aires',
        dialectOptions: {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

CatRoleModel(sequelize);
CatCountryModel(sequelize);
CatProvinceModel(sequelize);
CatCityModel(sequelize);
AnthropometricDetailsModel(sequelize);
AppointmentSchedulingModel(sequelize);
CatAnthropometricMeasureTypeModel(sequelize);
CatAppointmentModalityModel(sequelize);
CatChatStatusModel(sequelize);
CatDiagnosticTestTypeModel(sequelize);
CatIdTypeModel(sequelize);
CatMeasureUnitModel(sequelize);
CatMedicalSpecialtyModel(sequelize);
CatSchedulingStatusModel(sequelize);
CatVitalSignMeasureTypeModel(sequelize);
CatWeekDayModel(sequelize);
ChatModel(sequelize);
ChatMessageModel(sequelize);
ChatUserModel(sequelize);
DiagnosticTestModel(sequelize);
DiagnosticTestPrescriptionModel(sequelize);
DrugPrescriptionModel(sequelize);
MedicalEventModel(sequelize);
OneTimePasswordModel(sequelize);
PhysicianAgendaConfigurationModel(sequelize);
PhysicianSpecialtyModel(sequelize);
SociodemographicDetailsModel(sequelize);
UserModel(sequelize);
VitalSignDetailsModel(sequelize);
PhysicianDetailsModel(sequelize);
PhysicianAttendancePlaceModel(sequelize);
CatMedicalRegistrationTypeModel(sequelize);
PhysicianMedicalRegistryModel(sequelize);
RequestPatientContactModel(sequelize);
CatDiseaseModel(sequelize);
CatDrugPresentationModel(sequelize);
CatDrugModel(sequelize);
CatMedicalBackgroundTypeModel(sequelize);
CatMedicalProcedureModel(sequelize);
CatMedicalProcedureTypeModel(sequelize);
MedicalIndicationsModel(sequelize);
MedicalProcedurePrescriptionModel(sequelize);
MedicalReferralModel(sequelize);
PatientDiagnosticModel(sequelize);
PatientMedicalBackgroundModel(sequelize);
TherapyPrescriptionModel(sequelize);
CatTherapyModel(sequelize);
CatCivilStatusModel(sequelize);
CatGenreModel(sequelize);
CatEducationalLevelModel(sequelize);
CatHealthCarePlanModel(sequelize);
CatPhysicalSubsystemModel(sequelize);
PatientPhysicalExaminationModel(sequelize);
PhysicianReviewModel(sequelize);
CatPhysicianExpertiseLevelModel(sequelize);
PatientReviewModel(sequelize);
LoginRecordModel(sequelize);
CatCardiovascularRiskModel(sequelize);
PatientCardiovascularRiskModel(sequelize)
PatientHeartFailureClassificationModel(sequelize)
CatHeartFailureClassificationModel(sequelize)
PatientPulmonaryHypertensionRiskModel(sequelize)
CatPulmonaryArterialHypertensionRiskModel(sequelize)
PatientPainMapModel(sequelize)
CatPainAreasModel(sequelize)
CatPainDurationModel(sequelize)
CatPainFrequencyModel(sequelize)
CatPainScaleModel(sequelize)
CatPainTypeModel(sequelize)
CatSurgicalRiskModel(sequelize)
CatPulmonaryHypertensionGroupModel(sequelize)
PatientPulmonaryHypertensionGroupModel(sequelize)
PatientSurgicalRiskModel(sequelize)
BackgroundsModel(sequelize)
UserCurrentLocationModel(sequelize)
AlarmEventModel(sequelize)
ProvisionalPreConsultationModel(sequelize)
DoctorScheduleModel(sequelize);
CatCenterAttetionModel(sequelize);
PhysicianFavoritePatientModel(sequelize);

export const {
    DiagnosticTest,
    AppointmentScheduling,
    MedicalEvent,
    AnthropometricDetails,
    CatAnthropometricMeasureType,
    PhysicianAgendaConfiguration,
    CatAppointmentModality,
    CatDiagnosticTestType,
    User,
    CatIdType,
    CatMeasureUnit,
    CatVitalSignMeasureType,
    CatMedicalSpecialty,
    PhysicianSpecialty,
    CatRole,
    CatSchedulingStatus,
    VitalSignDetails,
    CatWeekDay,
    Chat,
    ChatMessage,
    ChatUser,
    DiagnosticTestPrescription,
    DrugPrescription,
    OneTimePassword,
    SociodemographicDetails,
    CatChatStatus,
    PhysicianDetails,
    CatCity,
    CatCountry,
    PhysicianAttendancePlace,
    PhysicianMedicalRegistry,
    CatMedicalRegistrationType,
    RequestPatientContact,
    CatProvince,
    CatDisease,
    CatDrug,
    CatDrugPresentation,
    CatMedicalBackgroundType,
    CatMedicalProcedure,
    CatMedicalProcedureType,
    MedicalIndications,
    MedicalProcedurePrescription,
    MedicalReferral,
    PatientDiagnostic,
    PatientMedicalBackground,
    TherapyPrescription,
    CatTherapy,
    CatCivilStatus,
    CatGenre,
    CatEducationalLevel,
    CatHealthCarePlan,
    CatPhysicalSubsystem,
    PatientPhysicalExamination,
    PhysicianReview,
    CatPhysicianExpertiseLevel,
    PatientReview,
    LoginRecord,
    CatCardiovascularRisk,
    PatientCardiovascularRisk,
    PatientHeartFailureClassification,
    CatHeartFailureClassification,
    PatientPulmonaryHypertensionRisk,
    CatPulmonaryArterialHypertensionRisk,
    PatientPainMap,
    CatPainAreas,
    CatPainDuration,
    CatPainFrequency,
    CatPainScale,
    CatPainType,
    CatPulmonaryHypertensionGroup,
    CatSurgicalRisk,
    PatientPulmonaryHypertensionGroup,
    PatientSurgicalRisk,
    UserCurrentLocation,
    AlarmEvent,
    ProvisionalPreConsultation,
    Backgrounds,
    DoctorSchedule, // Doctor-attention
    PhysicianFavoritePatient,
    CatCenterAttention,

} = sequelize.models;



DiagnosticTest.belongsTo(AppointmentScheduling, { as: "scheduling_appointment_scheduling", foreignKey: "scheduling" });
AppointmentScheduling.hasMany(DiagnosticTest, { as: "schDiagnosticTests", foreignKey: "scheduling" });
MedicalEvent.belongsTo(AppointmentScheduling, { as: "appSch", foreignKey: "scheduling" });
AppointmentScheduling.hasOne(MedicalEvent, { as: "medicalEvent", foreignKey: "scheduling" });
AnthropometricDetails.belongsTo(CatAnthropometricMeasureType, {
    as: "anthMeasType",
    foreignKey: "measure_type"
});
CatAnthropometricMeasureType.hasMany(AnthropometricDetails, { as: "anthropometric_details", foreignKey: "measure_type" });
PhysicianAgendaConfiguration.belongsTo(CatAppointmentModality, {
    as: "modality_cat_appointment_modality",
    foreignKey: "modality"
});
CatAppointmentModality.hasMany(PhysicianAgendaConfiguration, {
    as: "physician_agenda_configurations",
    foreignKey: "modality"
});
DiagnosticTest.belongsTo(CatDiagnosticTestType, { as: "catDiagnosticTestType", foreignKey: "test_type" });
CatDiagnosticTestType.hasMany(DiagnosticTest, { as: "diagnostic_tests", foreignKey: "test_type" });
User.belongsTo(CatIdType, { as: "userIdType", foreignKey: "id_type" });
CatIdType.hasMany(User, { as: "users", foreignKey: "id_type" });
CatAnthropometricMeasureType.belongsTo(CatMeasureUnit, {
    as: "measUnit",
    foreignKey: "measure_unit"
});
CatMeasureUnit.hasMany(CatAnthropometricMeasureType, {
    as: "cat_anthropometric_measure_types",
    foreignKey: "measure_unit"
});
CatVitalSignMeasureType.belongsTo(CatMeasureUnit, { as: "measUnit", foreignKey: "measure_unit" });
CatMeasureUnit.hasMany(CatVitalSignMeasureType, { as: "cat_vital_sign_measure_types", foreignKey: "measure_unit" });
AppointmentScheduling.belongsTo(CatMedicalSpecialty, {
    as: "specialty",
    foreignKey: "medical_specialty"
});
CatMedicalSpecialty.hasMany(AppointmentScheduling, { as: "appointment_schedulings", foreignKey: "medical_specialty" });
PhysicianAgendaConfiguration.belongsTo(CatMedicalSpecialty, {
    as: "specialty_cat_medical_specialty",
    foreignKey: "specialty"
});
CatMedicalSpecialty.hasMany(PhysicianAgendaConfiguration, {
    as: "physician_agenda_configurations",
    foreignKey: "specialty"
});
PhysicianSpecialty.belongsTo(CatMedicalSpecialty, {
    as: "specialty",
    foreignKey: "medical_specialty"
});
CatMedicalSpecialty.hasMany(PhysicianSpecialty, { as: "physicianSpecialties", foreignKey: "medical_specialty" });
User.belongsTo(CatRole, { as: "userRole", foreignKey: "role" });
CatRole.hasMany(User, { as: "users", foreignKey: "role" });
AppointmentScheduling.belongsTo(CatSchedulingStatus, {
    as: "status",
    foreignKey: "scheduling_status"
});
CatSchedulingStatus.hasMany(AppointmentScheduling, { as: "appointment_schedulings", foreignKey: "scheduling_status" });
VitalSignDetails.belongsTo(CatVitalSignMeasureType, {
    as: "vitalSignMeasureType",
    foreignKey: "measure_type"
});
CatVitalSignMeasureType.hasMany(VitalSignDetails, { as: "vital_sign_details", foreignKey: "measure_type" });
PhysicianAgendaConfiguration.belongsTo(CatWeekDay, { as: "week_day_cat_week_day", foreignKey: "week_day" });
CatWeekDay.hasMany(PhysicianAgendaConfiguration, { as: "physician_agenda_configurations", foreignKey: "week_day" });
Chat.belongsTo(CatChatStatus, { as: "statusCatChatStatus", foreignKey: "status" });
CatChatStatus.hasMany(Chat, { as: "chats", foreignKey: "status" });
ChatMessage.belongsTo(Chat, { as: "chat_chat", foreignKey: "chat" });
Chat.hasMany(ChatMessage, { as: "chat_messages", foreignKey: "chat" });
ChatUser.belongsTo(Chat, { as: "chat_chat", foreignKey: "chat" });
Chat.hasMany(ChatUser, { as: "chat_users", foreignKey: "chat" });
DiagnosticTest.belongsTo(DiagnosticTestPrescription, { as: "testPrescription", foreignKey: "diagnosticTestPrescription"});
DiagnosticTestPrescription.hasMany(DiagnosticTest, { as: "diagnosticTests", foreignKey: "diagnosticTestPrescription"});
DrugPrescription.belongsTo(MedicalEvent, { as: "medical_event_medical_event", foreignKey: "medical_event" });
MedicalEvent.hasMany(DrugPrescription, { as: "drugPrescriptions", foreignKey: "medical_event" });
AnthropometricDetails.belongsTo(User, { as: "measSourcePhys", foreignKey: "measure_source" });
User.hasMany(AnthropometricDetails, { as: "anthDetails", foreignKey: "measure_source" });
AnthropometricDetails.belongsTo(User, { as: "patient_user", foreignKey: "patient" });
User.hasMany(AnthropometricDetails, { as: "patientAnthDet", foreignKey: "patient" });
AppointmentScheduling.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(AppointmentScheduling, { as: "patientAppScheds", foreignKey: "patient" });
AppointmentScheduling.belongsTo(User, { as: "physicianThatAttend", foreignKey: "physician" });
User.hasMany(AppointmentScheduling, { as: "physicianScheduling", foreignKey: "physician" });
ChatMessage.belongsTo(User, { as: "recipient_user", foreignKey: "recipient" });
User.hasMany(ChatMessage, { as: "chat_messages", foreignKey: "recipient" });
ChatMessage.belongsTo(User, { as: "sender_user", foreignKey: "sender" });
User.hasMany(ChatMessage, { as: "sender_chat_messages", foreignKey: "sender" });
ChatUser.belongsTo(User, { as: "user_user", foreignKey: "user" });
User.hasMany(ChatUser, { as: "chat_users", foreignKey: "user" });
DiagnosticTest.belongsTo(User, { as: "patient_user", foreignKey: "patient" });
User.hasMany(DiagnosticTest, { as: "diagnostic_tests", foreignKey: "patient" });
DrugPrescription.belongsTo(User, { as: "patient_user", foreignKey: "patient" });
User.hasMany(DrugPrescription, { as: "drug_prescriptions", foreignKey: "patient" });
DrugPrescription.belongsTo(User, { as: "prescribed_physician_user", foreignKey: "prescribed_physician" });
User.hasMany(DrugPrescription, { as: "prescribed_physician_drug_prescriptions", foreignKey: "prescribed_physician" });
OneTimePassword.belongsTo(User, { as: "user_user", foreignKey: "user" });
User.hasMany(OneTimePassword, { as: "oneTimePasswords", foreignKey: "user" });
PhysicianAgendaConfiguration.belongsTo(User, { as: "physician_user", foreignKey: "physician" });
User.hasMany(PhysicianAgendaConfiguration, { as: "physician_agenda_configurations", foreignKey: "physician" });
PhysicianSpecialty.belongsTo(User, { as: "physician_user", foreignKey: "physician" });
User.hasMany(PhysicianSpecialty, { as: "physicianSpecialties", foreignKey: "physician" });
SociodemographicDetails.belongsTo(User, { as: "patient_user", foreignKey: "patient" });
User.hasOne(SociodemographicDetails, { as: "socDemDet", foreignKey: "patient" });
VitalSignDetails.belongsTo(User, { as: "measSourceUser", foreignKey: "measure_source" });
User.hasMany(VitalSignDetails, { as: "vital_sign_details", foreignKey: "measure_source" });
VitalSignDetails.belongsTo(User, { as: "patient_user", foreignKey: "patient" });
User.hasMany(VitalSignDetails, { as: "patientVitalSignDetails", foreignKey: "patient" });
PhysicianDetails.belongsTo(User, { as: "physicianUser", foreignKey: "physician" });
VitalSignDetails.belongsTo(AppointmentScheduling, { as: "appointmentSchedulingSings", foreignKey: "scheduling"});
AppointmentScheduling.hasMany(VitalSignDetails, { as: "vitalSignDetailsScheduling", foreignKey: "scheduling"});
VitalSignDetails.belongsTo(MedicalEvent, { as: "medicalEventSings", foreignKey: "medicalEvent"});
MedicalEvent.hasMany(VitalSignDetails, { as: "vitalSignDetailsMedicalEvent", foreignKey: "medicalEvent"});
User.hasOne(PhysicianDetails, { as: "physicianDetails", foreignKey: "physician" });
PhysicianDetails.belongsTo(CatPhysicianExpertiseLevel, { as: "physicianExpertiseLevel", foreignKey: "expertiseLevel" });
CatPhysicianExpertiseLevel.hasMany(PhysicianDetails, { as: "physicianDetails", foreignKey: "expertiseLevel" });
CatCity.belongsTo(CatProvince, { as: "cityProvince", foreignKey: "province" });
CatCountry.hasMany(CatProvince, { as: "catProvinces", foreignKey: "country" });
User.belongsTo(CatCountry, { as: "userNationality", foreignKey: "nationality" });
// CatCountry.hasMany(User, {as: "users", foreignKey: "nationality"});
User.hasMany(RequestPatientContact, { as: "requestPatientContact", foreignKey: "requestingUserId" });
RequestPatientContact.belongsTo(User, { as: "requestPatientContact", foreignKey: "requestingUserId" })
PhysicianMedicalRegistry.belongsTo(CatMedicalRegistrationType, {
    as: "medicalRegistrationType",
    foreignKey: "registryType"
});
CatMedicalRegistrationType.hasMany(PhysicianMedicalRegistry, {
    as: "physicianMedicalRegistries",
    foreignKey: "registryType"
});
PhysicianAgendaConfiguration.belongsTo(PhysicianAttendancePlace, {
    as: "attendacePlacePhysicianAttendancePlace",
    foreignKey: "attendacePlace"
});
PhysicianAttendancePlace.hasMany(PhysicianAgendaConfiguration, {
    as: "physicianAgendaConfigurations",
    foreignKey: "attendacePlace"
});
PhysicianAttendancePlace.belongsTo(User, { as: "physicianUser", foreignKey: "physician" });
User.hasMany(PhysicianAttendancePlace, { as: "physicianAttendancePlaces", foreignKey: "physician" });
PhysicianMedicalRegistry.belongsTo(User, { as: "physicianUser", foreignKey: "physician" });
User.hasMany(PhysicianMedicalRegistry, { as: "physicianMedicalRegistries", foreignKey: "physician" });
User.belongsTo(CatCity, { as: "currentLocationCatCity", foreignKey: "currentLocation" });
CatProvince.belongsTo(CatCountry, { as: "provinceCountry", foreignKey: "country" });
CatProvince.hasMany(CatCity, { as: "catCities", foreignKey: "province" });
PatientDiagnostic.belongsTo(CatDisease, { as: "diagnosedDisease", foreignKey: "disease" });
CatDisease.hasMany(PatientDiagnostic, { as: "patientDiagnostics", foreignKey: "disease" });
PatientMedicalBackground.belongsTo(CatDisease, { as: "catDisease", foreignKey: "disease" });
CatDisease.hasMany(PatientMedicalBackground, { as: "patientMedicalBackgrounds", foreignKey: "disease" });
CatDrug.belongsTo(CatDrugPresentation, { as: "catDrugPresentation", foreignKey: "presentation" });
CatDrugPresentation.hasMany(CatDrug, { as: "catDrugs", foreignKey: "presentation" });
PatientMedicalBackground.belongsTo(CatMedicalBackgroundType, {
    as: "medicalBackgroundType",
    foreignKey: "backgroundType"
});
CatMedicalBackgroundType.hasMany(PatientMedicalBackground, {
    as: "patientMedicalBackgrounds",
    foreignKey: "backgroundType"
});
MedicalProcedurePrescription.belongsTo(CatMedicalProcedure, {
    as: "catMedicalProcedure",
    foreignKey: "medicalProcedure"
});
CatMedicalProcedure.hasMany(MedicalProcedurePrescription, {
    as: "medicalProcedurePrescriptions",
    foreignKey: "medicalProcedure"
});
CatMedicalProcedure.belongsTo(CatMedicalProcedureType, {
    as: "catMedicalProcedureType",
    foreignKey: "procedureType"
});
CatMedicalProcedureType.hasMany(CatMedicalProcedure, { as: "catMedicalProcedures", foreignKey: "procedureType" });
MedicalReferral.belongsTo(CatMedicalSpecialty, { as: "specialtyCatMedicalSpecialty", foreignKey: "specialty" });
CatMedicalSpecialty.hasMany(MedicalReferral, { as: "medicalReferrals", foreignKey: "specialty" });
TherapyPrescription.belongsTo(CatTherapy, { as: "therapyCatTherapy", foreignKey: "therapy" });
CatTherapy.hasMany(TherapyPrescription, { as: "therapyPrescriptions", foreignKey: "therapy" });
DiagnosticTestPrescription.belongsTo(MedicalEvent, {
    as: "medicalEventMedicalEvent",
    foreignKey: "medicalEvent"
});
MedicalEvent.hasMany(DiagnosticTestPrescription, {
    as: "diagnosticTestExaminationPrescriptions",
    foreignKey: "medicalEvent"
});
MedicalIndications.belongsTo(MedicalEvent, { as: "medicalEventMedicalEvent", foreignKey: "medicalEvent" });
MedicalEvent.hasMany(MedicalIndications, { as: "medicalIndications", foreignKey: "medicalEvent" });
MedicalProcedurePrescription.belongsTo(MedicalEvent, { as: "medicalEventMedicalEvent", foreignKey: "medicalEvent" });
MedicalEvent.hasMany(MedicalProcedurePrescription, { as: "procedurePrescriptions", foreignKey: "medicalEvent" });
MedicalReferral.belongsTo(MedicalEvent, { as: "medicalEventMedicalEvent", foreignKey: "medicalEvent" });
MedicalEvent.hasMany(MedicalReferral, { as: "medicalReferrals", foreignKey: "medicalEvent" });
PatientDiagnostic.belongsTo(MedicalEvent, { as: "medicalEventMedicalEvent", foreignKey: "medicalEvent" });
MedicalEvent.hasMany(PatientDiagnostic, { as: "patientDiagnostics", foreignKey: "medicalEvent" });
TherapyPrescription.belongsTo(MedicalEvent, { as: "medicalEventMedicalEvent", foreignKey: "medicalEvent" });
MedicalEvent.hasMany(TherapyPrescription, { as: "therapyPrescriptions", foreignKey: "medicalEvent" });
PatientMedicalBackground.belongsTo(PatientDiagnostic, { as: "diagnosticPatientDiagnostic", foreignKey: "diagnostic" });
PatientDiagnostic.hasMany(PatientMedicalBackground, { as: "patientMedicalBackgrounds", foreignKey: "diagnostic" });
DiagnosticTest.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
DiagnosticTestPrescription.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(DiagnosticTestPrescription, {
    as: "diagnosticTestExaminationPrescriptions",
    foreignKey: "patient"
});
DiagnosticTestPrescription.belongsTo(User, {
    as: "prescribedPhysicianUser",
    foreignKey: "prescribedPhysician"
});
User.hasMany(DiagnosticTestPrescription, {
    as: "prescribedPhysicianDiagnosticTestPrescriptions",
    foreignKey: "prescribedPhysician"
});
MedicalIndications.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(MedicalIndications, { as: "medicalIndications", foreignKey: "patient" });
MedicalIndications.belongsTo(User, { as: "prescribedPhysicianUser", foreignKey: "prescribedPhysician" });
User.hasMany(MedicalIndications, { as: "prescribedPhysicianMedicalIndications", foreignKey: "prescribedPhysician" });
MedicalProcedurePrescription.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(MedicalProcedurePrescription, { as: "medicalProcedurePrescriptions", foreignKey: "patient" });
MedicalProcedurePrescription.belongsTo(User, { as: "prescribedPhysicianUser", foreignKey: "prescribedPhysician" });
User.hasMany(MedicalProcedurePrescription, {
    as: "prescribedPhysicianMedicalProcedurePrescriptions",
    foreignKey: "prescribedPhysician"
});
MedicalReferral.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(MedicalReferral, { as: "medicalReferrals", foreignKey: "patient" });
MedicalReferral.belongsTo(User, { as: "prescribedByUser", foreignKey: "prescribedBy" });
User.hasMany(MedicalReferral, { as: "prescribedByMedicalReferrals", foreignKey: "prescribedBy" });
PatientDiagnostic.belongsTo(User, { as: "diagnosedByUser", foreignKey: "diagnosedBy" });
User.hasMany(PatientDiagnostic, { as: "patientDiagnostics", foreignKey: "diagnosedBy" });
PatientDiagnostic.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(PatientDiagnostic, { as: "patientPatientDiagnostics", foreignKey: "patient" });
PatientMedicalBackground.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(PatientMedicalBackground, { as: "patientMedicalBackgrounds", foreignKey: "patient" });
TherapyPrescription.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(TherapyPrescription, { as: "therapyPrescriptions", foreignKey: "patient" });
TherapyPrescription.belongsTo(User, { as: "prescribedPhysicianUser", foreignKey: "prescribedPhysician" });
User.hasMany(TherapyPrescription, { as: "prescribedPhysicianTherapyPrescriptions", foreignKey: "prescribedPhysician" });
SociodemographicDetails.belongsTo(CatCivilStatus, { as: "catCivilStatus", foreignKey: "civilStatus" });
SociodemographicDetails.belongsTo(CatEducationalLevel, {
    as: "catEducationalLevel",
    foreignKey: "educationalLevel"
});
SociodemographicDetails.belongsTo(CatGenre, { as: "catGenre", foreignKey: "genre" });
SociodemographicDetails.belongsTo(CatHealthCarePlan, {
    as: "catHealthCarePlan",
    foreignKey: "healthCarePlan"
});
SociodemographicDetails.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
PatientPhysicalExamination.belongsTo(CatPhysicalSubsystem, { as: "catPhysicalSubsystem", foreignKey: "physicalSubsystem" });
DiagnosticTest.belongsTo(MedicalEvent, { as: "medicalEventMedicalEvent", foreignKey: "medicalEvent" });
MedicalEvent.hasMany(DiagnosticTest, { as: "diagnosticTests", foreignKey: "medicalEvent" });
PatientPhysicalExamination.belongsTo(MedicalEvent, { as: "medicalEventMedicalEvent", foreignKey: "medicalEvent" });
MedicalEvent.hasMany(PatientPhysicalExamination, { as: "patientPhysicalExaminations", foreignKey: "medicalEvent" });
DrugPrescription.belongsTo(CatDrug, { as: "catDrug", foreignKey: "drug" });
User.hasMany(PhysicianReview, { as: "patienPhysicianReview", foreignKey: "patientId" })
PhysicianReview.belongsTo(User, { as: "patientPatienPhysicianReview", foreignKey: "patientId" })
User.hasMany(PhysicianReview, { as: "physicianReview", foreignKey: "physicianId" })
PhysicianReview.belongsTo(User, { as: "physician", foreignKey: "physicianId" })
User.hasMany(PatientReview, { as: "physicianPatientReview", foreignKey: "physicianId" })
PatientReview.belongsTo(User, { as: "physicianPhysicianPatientReview", foreignKey: "physicianId" })
User.hasMany(PatientReview, { as: "patientReview", foreignKey: "patientId" })
PatientReview.belongsTo(User, { as: "patient", foreignKey: "patientId" })
User.hasMany(LoginRecord, { as: "loginRecord", foreignKey: "id" })
PatientCardiovascularRisk.belongsTo(CatCardiovascularRisk, { as: "catCvRisk", foreignKey: "risk" });
PatientHeartFailureClassification.belongsTo(CatHeartFailureClassification, { as: "CatHeartFailureClass", foreignKey: "heartFailureClassification" });
CatHeartFailureClassification.hasMany(PatientHeartFailureClassification, { as: "patientHeartFailureClassifications", foreignKey: "heartFailureClassification" });
PatientPulmonaryHypertensionRisk.belongsTo(CatPulmonaryArterialHypertensionRisk, { as: "catHpRisk", foreignKey: "pulmonaryHypertensionRisk" });
CatPulmonaryArterialHypertensionRisk.hasMany(PatientPulmonaryHypertensionRisk, { as: "patientPulmonaryHypertensionRisks", foreignKey: "pulmonaryHypertensionRisk" });
PatientCardiovascularRisk.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(PatientCardiovascularRisk, { as: "ptCvRsks", foreignKey: "patient" });
PatientCardiovascularRisk.belongsTo(User, { as: "physicianUser", foreignKey: "physician" });
User.hasMany(PatientCardiovascularRisk, { as: "physicianPatientCardiovascularRisks", foreignKey: "physician" });
PatientHeartFailureClassification.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(PatientHeartFailureClassification, { as: "patientHeartFailureClassifications", foreignKey: "patient" });
PatientHeartFailureClassification.belongsTo(User, { as: "physicianUser", foreignKey: "physician" });
User.hasMany(PatientHeartFailureClassification, { as: "physicianPatientHeartFailureClassifications", foreignKey: "physician" });
PatientPulmonaryHypertensionRisk.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(PatientPulmonaryHypertensionRisk, { as: "patientPulmonaryHypertensionRisks", foreignKey: "patient" });
PatientPulmonaryHypertensionRisk.belongsTo(User, { as: "physicianUser", foreignKey: "physician" });
User.hasMany(PatientPulmonaryHypertensionRisk, { as: "physicianPatientPulmonaryHypertensionRisks", foreignKey: "physician" });
PatientPainMap.belongsTo(AppointmentScheduling, { as: "schedulingAppointmentScheduling", foreignKey: "scheduling" });
AppointmentScheduling.hasMany(PatientPainMap, { as: "patientPainMaps", foreignKey: "scheduling" });
// PatientPainMap.belongsTo(CatPainAreas, { as: "catPainArea", foreignKey: "painArea" });
// CatPainAreas.hasMany(PatientPainMap, { as: "patientPainMaps", foreignKey: "painArea" });
PatientPainMap.belongsTo(CatPainDuration, { as: "catPainDuration", foreignKey: "painDuration" });
CatPainDuration.hasMany(PatientPainMap, { as: "patientPainMaps", foreignKey: "painDuration" });
PatientPainMap.belongsTo(CatPainFrequency, { as: "catPainFrequency", foreignKey: "painFrequency" });
CatPainFrequency.hasMany(PatientPainMap, { as: "patientPainMaps", foreignKey: "painFrequency" });
PatientPainMap.belongsTo(CatPainScale, { as: "catPainScale", foreignKey: "painScale" });
CatPainScale.hasMany(PatientPainMap, { as: "patientPainMaps", foreignKey: "painScale" });
PatientPainMap.belongsTo(CatPainType, { as: "catPainType", foreignKey: "painType" });
CatPainType.hasMany(PatientPainMap, { as: "patientPainMaps", foreignKey: "painType" });
PatientPainMap.belongsTo(MedicalEvent, { as: "medicalEventMedicalEvent", foreignKey: "medicalEvent" });
MedicalEvent.hasMany(PatientPainMap, { as: "patientPainMaps", foreignKey: "medicalEvent" });
PatientPainMap.belongsTo(User, { as: "painOwnerUser", foreignKey: "painOwner" });
User.hasMany(PatientPainMap, { as: "patientPainMaps", foreignKey: "painOwner" });
PatientPainMap.belongsTo(User, { as: "painRecorderUser", foreignKey: "painRecorder" });
User.hasMany(PatientPainMap, { as: "painRecorderPatientPainMaps", foreignKey: "painRecorder" });
PatientPulmonaryHypertensionGroup.belongsTo(CatPulmonaryHypertensionGroup, { as: "catHpGroup", foreignKey: "group" });
CatPulmonaryHypertensionGroup.hasMany(PatientPulmonaryHypertensionGroup, { as: "hpGroup", foreignKey: "group" });
PatientSurgicalRisk.belongsTo(CatSurgicalRisk, { as: "catSurgicalRisk", foreignKey: "risk" });
CatSurgicalRisk.hasMany(PatientSurgicalRisk, { as: "surgicalRisk", foreignKey: "risk" });
PatientPulmonaryHypertensionGroup.belongsTo(User, { as: "patientHpGroup", foreignKey: "patient" });
User.hasMany(PatientPulmonaryHypertensionGroup, { as: "userHpGroups", foreignKey: "patient" });
PatientPulmonaryHypertensionGroup.belongsTo(User, { as: "physicianHpGroup", foreignKey: "physician" });
User.hasMany(PatientPulmonaryHypertensionGroup, { as: "physicianUserHpGroups", foreignKey: "physician" });
PatientSurgicalRisk.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(PatientSurgicalRisk, { as: "patSgRisks", foreignKey: "patient" });
PatientSurgicalRisk.belongsTo(User, { as: "physicianUser", foreignKey: "physician" });
User.hasMany(PatientSurgicalRisk, { as: "physicianSurgicalRisks", foreignKey: "physician" });
User.hasOne(UserCurrentLocation, {as:'currentLocationUser', foreignKey: "user"});
UserCurrentLocation.belongsTo(User, {as:'userCurrentLocation', foreignKey: "user"});
AppointmentScheduling.belongsTo(CatAppointmentModality, { as: "appointmentModality", foreignKey: "typeOfMedicalConsultation"});
CatAppointmentModality.hasMany(AppointmentScheduling, { as: "appointmentSchedulings", foreignKey: "typeOfMedicalConsultation"});
AppointmentScheduling.belongsTo(PhysicianAttendancePlace, { as: "attendancePlace", foreignKey: "healthCenter"});
PhysicianAttendancePlace.hasMany(AppointmentScheduling, { as: "appointmentSchedulings", foreignKey: "healthCenter"});
User.hasMany(AlarmEvent,{as:'patientAlarms',foreignKey:'patient'})
AlarmEvent.belongsTo(User, {as:"AlarmForPatient", foreignKey:"patient"})
ProvisionalPreConsultation.belongsTo(User, {as:"provisionalPreConsultationUser", foreignKey:'patient'})
User.hasMany(ProvisionalPreConsultation, {as:"provisionalPreConsultationUser", foreignKey:'patient'})
ProvisionalPreConsultation.belongsTo(AppointmentScheduling, {as:'ProvisionalPreConsultationSchedule',foreignKey:'appointment_schedule'})
AppointmentScheduling.hasOne(ProvisionalPreConsultation,{as:'ProvisionalPreConsultationSchedule',foreignKey:'appointment_schedule'})
ProvisionalPreConsultation.belongsTo(PatientPainMap,{as:'provisionalPreConsultationPainMap',foreignKey:'physical_examination'})
PatientPainMap.hasOne(ProvisionalPreConsultation,{as:'provisionalPreConsultationPainMap',foreignKey:'physical_examination'})
Backgrounds.belongsTo(MedicalEvent, { as: "medicalEventMedicalBackgrounds", foreignKey: "medicalEvent"});
MedicalEvent.hasOne(Backgrounds, { as: "background", foreignKey: "medicalEvent"});
Backgrounds.belongsTo(User, { as: "patientUser", foreignKey: "patient"});
User.hasMany(Backgrounds, { as: "backgrounds", foreignKey: "patient"});
User.hasMany(DoctorSchedule, { foreignKey: "doctor_id"});
DoctorSchedule.belongsTo(User, { foreignKey: "doctor_id"});
PhysicianFavoritePatient.belongsTo(User, { foreignKey: 'favoritePatient', as: 'user' });
PhysicianFavoritePatient.belongsTo(User, { foreignKey: 'physicianId', as: 'physician' });
User.belongsTo(PhysicianDetails, { as: "treatingPhysicianId", foreignKey: 'treatingPhysician' });
PhysicianDetails.hasMany(User, { as: "treatingPhysician", foreignKey: 'treatingPhysician' });

// Center Attention
SociodemographicDetails.belongsTo(CatCenterAttention, { as: "catCenterAttention", foreignKey: "centerAttention" });
CatCenterAttention.hasMany(SociodemographicDetails, { as: "sociodemographicDetails", foreignKey: "centerAttention" });
CatCenterAttention.belongsTo(CatCity, { foreignKey: "city" });
CatCity.hasMany(CatCenterAttention, { foreignKey: "city" });

const models = {
    AnthropometricDetails,
    AppointmentScheduling,
    CatAnthropometricMeasureType,
    CatAppointmentModality,
    CatChatStatus,
    CatDiagnosticTestType,
    CatIdType,
    CatMeasureUnit,
    CatMedicalSpecialty,
    CatRole,
    CatSchedulingStatus,
    CatVitalSignMeasureType,
    CatWeekDay,
    Chat,
    ChatMessage,
    ChatUser,
    DiagnosticTest,
    DiagnosticTestPrescription,
    DrugPrescription,
    MedicalEvent,
    OneTimePassword,
    PhysicianAgendaConfiguration,
    PhysicianSpecialty,
    SociodemographicDetails,
    User,
    VitalSignDetails,
    PhysicianDetails,
    CatCity,
    CatCountry,
    PhysicianAttendancePlace,
    PhysicianMedicalRegistry,
    CatMedicalRegistrationType,
    RequestPatientContact,
    CatProvince,
    CatDisease,
    CatDrug,
    CatDrugPresentation,
    CatMedicalBackgroundType,
    CatMedicalProcedure,
    CatMedicalProcedureType,
    MedicalIndications,
    MedicalProcedurePrescription,
    MedicalReferral,
    PatientDiagnostic,
    PatientMedicalBackground,
    TherapyPrescription,
    CatTherapy,
    CatCivilStatus,
    CatGenre,
    CatEducationalLevel,
    CatHealthCarePlan,
    CatPhysicalSubsystem,
    PatientPhysicalExamination,
    PhysicianReview,
    CatPhysicianExpertiseLevel,
    PatientReview,
    LoginRecord,
    CatCardiovascularRisk,
    PatientCardiovascularRisk,
    PatientHeartFailureClassification,
    CatHeartFailureClassification,
    PatientPulmonaryHypertensionRisk,
    CatPulmonaryArterialHypertensionRisk,
    PatientPainMap,
    CatPainAreas,
    CatPainDuration,
    CatPainFrequency,
    CatPainScale,
    CatPainType,
    CatSurgicalRisk,
    CatPulmonaryHypertensionGroup,
    PatientPulmonaryHypertensionGroup,
    PatientSurgicalRisk,
    AlarmEvent,
    ProvisionalPreConsultation,
    Backgrounds,
    DoctorSchedule,
    PhysicianFavoritePatient,
    CatCenterAttention
};

export default models

export { sequelize }
