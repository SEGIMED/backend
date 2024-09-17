import { Sequelize, SequelizeScopeError } from "sequelize";
import cls from "cls-hooked";

import AppointmentSchedulingModel from "./models/AppointmentScheduling.js";
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
import CatCivilStatusModel from "./models/CatCivilStatus.js";
import CatGenreModel from "./models/CatGenre.js";
import CatEducationalLevelModel from "./models/CatEducationalLevel.js";
import CatHealthCarePlanModel from "./models/CatHealthCarePlan.js";
import CatPhysicalSubsystemModel from "./models/CatPhysicalSubsystem.js";
import PatientPhysicalExaminationModel from "./models/PatientPhysicalExamination.js";
import PhysicianReviewModel from "./models/PhysicianReview.js";
import CatPhysicianExpertiseLevelModel from "./models/CatPhysicianExpertiseLevel.js";
import PatientReviewModel from "./models/PatientReview.js";
import LoginRecordModel from "./models/LoginRecord.js";
import PatientCardiovascularRiskModel from "./models/PatientCardiovascularRisk.js";
import PatientHeartFailureClassificationModel from "./models/PatientHeartFailureClassification.js";
import CatHeartFailureClassificationModel from "./models/CatHeartFailureClassification.js";
import PatientPulmonaryHypertensionRiskModel from "./models/PatientPulmonaryHypertensionRisk.js";
import CatRiskModel from "./models/CatRisk.js";
import CatPainAreasModel from "./models/CatPainAreas.js";
import CatPainDurationModel from "./models/CatPainDuration.js";
import CatPainFrequencyModel from "./models/CatPainFrequency.js";
import CatPainScaleModel from "./models/CatPainScale.js";
import CatPainTypeModel from "./models/CatPainType.js";
import PatientPainMapModel from "./models/PatientPainMap.js";
import PatientPulmonaryHypertensionGroupModel from "./models/PatientPulmonaryHypertensionGroup.js";
import CatPulmonaryHypertensionGroupModel from "./models/CatPulmonaryHypertensionGroup.js";
import PatientSurgicalRiskModel from "./models/PatientSurgicalRisk.js";
import UserCurrentLocationModel from "./models/UserCurrentLocation.js";
import AlarmEventModel from "./models/AlarmEvent.js";
import ProvisionalPreConsultationModel from "./models/ProvisionalPreConsultation.js";
import BackgroundsModel from "./models/Backgrounds.js";
import DoctorScheduleModel from "./models/DoctorSchedule.js";
import CatCenterAttetionModel from "./models/CatCenterAttention.js";
import PhysicianFavoritePatientModel from "./models/PhysicianFavoritePatient.js";
import RefreshTokenModel from "./models/RefreshToken.js";
import PhysicianOnboardingModel from "./models/PhysicianOnboarding.js";
import AttendentPlaceModel from "./models/AttendentPlace.js";
import CatRouteOfAdministrationModel from "./models/CatRouteOfAdministration.js";
import CatCommercialNameDrugModel from "./models/CatCommercialNameDrug.js";
import DrugDetailPresentationModel from "./models/DrugDetailPresentation.js";
import MedicationPrescriptionModel from "./models/MedicationPrescription.js";
import PrescriptionModificationsHistoryModel from "./models/PrescriptionModificationsHistory.js";
import MedicalInterconsultationsModel from "./models/MedicalInterconsultations.js";
import MedicalInterconsultationFileModel from "./models/MedicalInterconsultationFile.js";
import PatiendMedReqModel from "./models/PatientMedicalReq.js";
import PhysicianOrdersModel from "./models/PhysicianOrders.js";
import CatStudyTypeModel from "./models/CatStudyType.js";
import PatientStudiesModel from "./models/PatientStudies.js";
import SelfEvaluationEventModel from "./models/SelfEvaluationEvent.js";
import CategoryCieDiezModel from "./models/CategoryCieDiez.js";
import SubcategoriesCieDiezModel from "./models/SubCategoriesCieDiez.js";
import PatientDiagnosticsModel from "./models/PatientDiagnostics.js";
import GlycemiaRecordsModel from "./models/GlycemiaRecords.js";
import CatComorbiditiesCategoriesModel from "./models/CatComorbiditiesCategories.js";
import CatComorbiditiesDiseasesModel from "./models/CatComorbiditiesDiseases.js";
import UserComorbiditiesModel from "./models/UserComorbidities.js";
import CatConsultationReasonModel from "./models/CatConsultationReason.js";

// import
//JUST USE FOR LOCAL ENVIRONMENT WITHOUT NODEMON
// import { URL } from 'url';
// import { config } from "dotenv";
//
//
// config({ path: new URL('./../.env', import.meta.url).pathname });
//JUST USE FOR LOCAL ENVIRONMENT WITHOUT NODEMON

const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_TRANSACTIONS_CLS_NAMESPACE } =
  process.env;
const clsDBTransactionsNamespace = cls.createNamespace(
  DATABASE_TRANSACTIONS_CLS_NAMESPACE
);
Sequelize.useCLS(clsDBTransactionsNamespace);

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/segimed`,
  {
    logging: false,
    native: false,
    timezone: "America/Argentina/Buenos_Aires",
    dialectOptions: {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

CatRoleModel(sequelize);
CatCountryModel(sequelize);
CatProvinceModel(sequelize);
CatCityModel(sequelize);
AppointmentSchedulingModel(sequelize);

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
CatDiseaseModel(sequelize);
CatDrugPresentationModel(sequelize);
CatDrugModel(sequelize);
CatMedicalBackgroundTypeModel(sequelize);
CatMedicalProcedureModel(sequelize);
CatMedicalProcedureTypeModel(sequelize);
MedicalIndicationsModel(sequelize);
MedicalProcedurePrescriptionModel(sequelize);
MedicalReferralModel(sequelize);
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
PatientCardiovascularRiskModel(sequelize);
PatientHeartFailureClassificationModel(sequelize);
CatHeartFailureClassificationModel(sequelize);
PatientPulmonaryHypertensionRiskModel(sequelize);
CatRiskModel(sequelize);
PatientPainMapModel(sequelize);
CatPainAreasModel(sequelize);
CatPainDurationModel(sequelize);
CatPainFrequencyModel(sequelize);
CatPainScaleModel(sequelize);
CatPainTypeModel(sequelize);
CatPulmonaryHypertensionGroupModel(sequelize);
PatientPulmonaryHypertensionGroupModel(sequelize);
PatientSurgicalRiskModel(sequelize);
BackgroundsModel(sequelize);
UserCurrentLocationModel(sequelize);
AlarmEventModel(sequelize);
ProvisionalPreConsultationModel(sequelize);
DoctorScheduleModel(sequelize);
CatCenterAttetionModel(sequelize);
PhysicianFavoritePatientModel(sequelize);
RefreshTokenModel(sequelize);
PhysicianOnboardingModel(sequelize);
AttendentPlaceModel(sequelize);
CatRouteOfAdministrationModel(sequelize);
CatCommercialNameDrugModel(sequelize);
DrugDetailPresentationModel(sequelize);
MedicationPrescriptionModel(sequelize);
PrescriptionModificationsHistoryModel(sequelize);
MedicalInterconsultationsModel(sequelize);
MedicalInterconsultationFileModel(sequelize);
PatiendMedReqModel(sequelize);
PhysicianOrdersModel(sequelize);
CatStudyTypeModel(sequelize);
PatientStudiesModel(sequelize);
SelfEvaluationEventModel(sequelize);
CategoryCieDiezModel(sequelize);
SubcategoriesCieDiezModel(sequelize);
PatientDiagnosticsModel(sequelize);
GlycemiaRecordsModel(sequelize);
CatComorbiditiesCategoriesModel(sequelize);
CatComorbiditiesDiseasesModel(sequelize);
UserComorbiditiesModel(sequelize);
CatConsultationReasonModel(sequelize);

export const {
  AppointmentScheduling,
  MedicalEvent,
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
  OneTimePassword,
  SociodemographicDetails,
  CatChatStatus,
  PhysicianDetails,
  CatCity,
  CatCountry,
  PhysicianAttendancePlace,
  PhysicianMedicalRegistry,
  CatMedicalRegistrationType,
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
  PatientCardiovascularRisk,
  PatientHeartFailureClassification,
  CatHeartFailureClassification,
  PatientPulmonaryHypertensionRisk,
  CatRisk,
  PatientPainMap,
  CatPainAreas,
  CatPainDuration,
  CatPainFrequency,
  CatPainScale,
  CatPainType,
  CatPulmonaryHypertensionGroup,
  PatientPulmonaryHypertensionGroup,
  PatientSurgicalRisk,
  UserCurrentLocation,
  AlarmEvent,
  ProvisionalPreConsultation,
  Backgrounds,
  DoctorSchedule, // Doctor-attention
  PhysicianFavoritePatient,
  CatCenterAttention,
  RefreshToken,
  PhysicianOnboarding,
  AttendentPlace,
  CatRouteOfAdministration,
  CatCommercialNameDrug,
  DrugDetailPresentation,
  MedicationPrescription,
  PrescriptionModificationsHistory,
  MedicalInterconsultations,
  MedicalInterconsultationFile,
  PatientMedicalReq,
  PhysicianOrders,
  CatStudyType,
  PatientStudies,
  SelfEvaluationEvent,
  CategoryCieDiez,
  SubCategoriesCieDiez,
  PatientDiagnostics,
  GlycemiaRecords,
  CatComorbiditiesCategories,
  CatComorbiditiesDiseases,
  UserComorbidities,
  CatConsultationReason,
} = sequelize.models;

MedicalEvent.belongsTo(AppointmentScheduling, {
  as: "appSch",
  foreignKey: "scheduling",
});
AppointmentScheduling.hasOne(MedicalEvent, {
  as: "medicalEvent",
  foreignKey: "scheduling",
});
PhysicianAgendaConfiguration.belongsTo(CatAppointmentModality, {
  as: "modality_cat_appointment_modality",
  foreignKey: "modality",
});
CatAppointmentModality.hasMany(PhysicianAgendaConfiguration, {
  as: "physician_agenda_configurations",
  foreignKey: "modality",
});
User.belongsTo(CatIdType, { as: "userIdType", foreignKey: "id_type" });
CatIdType.hasMany(User, { as: "users", foreignKey: "id_type" });

CatVitalSignMeasureType.belongsTo(CatMeasureUnit, {
  as: "measUnit",
  foreignKey: "measure_unit",
});
CatMeasureUnit.hasMany(CatVitalSignMeasureType, {
  as: "cat_vital_sign_measure_types",
  foreignKey: "measure_unit",
});
AppointmentScheduling.belongsTo(CatMedicalSpecialty, {
  as: "specialty",
  foreignKey: "medical_specialty",
});
CatMedicalSpecialty.hasMany(AppointmentScheduling, {
  as: "appointment_schedulings",
  foreignKey: "medical_specialty",
});
PhysicianAgendaConfiguration.belongsTo(CatMedicalSpecialty, {
  as: "specialty_cat_medical_specialty",
  foreignKey: "specialty",
});
CatMedicalSpecialty.hasMany(PhysicianAgendaConfiguration, {
  as: "physician_agenda_configurations",
  foreignKey: "specialty",
});
PhysicianSpecialty.belongsTo(CatMedicalSpecialty, {
  as: "specialty",
  foreignKey: "medical_specialty",
});
CatMedicalSpecialty.hasMany(PhysicianSpecialty, {
  as: "physicianSpecialties",
  foreignKey: "medical_specialty",
});
User.belongsTo(CatRole, { as: "userRole", foreignKey: "role" });
CatRole.hasMany(User, { as: "users", foreignKey: "role" });
AppointmentScheduling.belongsTo(CatSchedulingStatus, {
  as: "status",
  foreignKey: "scheduling_status",
});
CatSchedulingStatus.hasMany(AppointmentScheduling, {
  as: "appointment_schedulings",
  foreignKey: "scheduling_status",
});
// En el modelo MedicalInterconsultations
MedicalInterconsultations.belongsTo(CatSchedulingStatus, {
  as: "statusCategory", // Cambiado de "interconsultationStatus" a "statusCategory"
  foreignKey: "interconsultation_status",
});

// En el modelo CatSchedulingStatus
CatSchedulingStatus.hasMany(MedicalInterconsultations, {
  as: "interconsultations",
  foreignKey: "interconsultation_status",
});

VitalSignDetails.belongsTo(CatVitalSignMeasureType, {
  as: "vitalSignMeasureType",
  foreignKey: "measure_type",
});
CatVitalSignMeasureType.hasMany(VitalSignDetails, {
  as: "vital_sign_details",
  foreignKey: "measure_type",
});
PhysicianAgendaConfiguration.belongsTo(CatWeekDay, {
  as: "week_day_cat_week_day",
  foreignKey: "week_day",
});
CatWeekDay.hasMany(PhysicianAgendaConfiguration, {
  as: "physician_agenda_configurations",
  foreignKey: "week_day",
});
Chat.belongsTo(CatChatStatus, {
  as: "statusCatChatStatus",
  foreignKey: "status",
});
CatChatStatus.hasMany(Chat, { as: "chats", foreignKey: "status" });
ChatMessage.belongsTo(Chat, { as: "chat_chat", foreignKey: "chat" });
Chat.hasMany(ChatMessage, { as: "chat_messages", foreignKey: "chat" });
ChatUser.belongsTo(Chat, { as: "chat_chat", foreignKey: "chat" });
Chat.hasMany(ChatUser, { as: "chat_users", foreignKey: "chat" });
AppointmentScheduling.belongsTo(User, {
  as: "patientUser",
  foreignKey: "patient",
});
User.hasMany(AppointmentScheduling, {
  as: "patientAppScheds",
  foreignKey: "patient",
});
AppointmentScheduling.belongsTo(User, {
  as: "physicianThatAttend",
  foreignKey: "physician",
});
User.hasMany(AppointmentScheduling, {
  as: "physicianScheduling",
  foreignKey: "physician",
});
ChatMessage.belongsTo(User, { as: "recipient_user", foreignKey: "recipient" });
User.hasMany(ChatMessage, { as: "chat_messages", foreignKey: "recipient" });
ChatMessage.belongsTo(User, { as: "sender_user", foreignKey: "sender" });
User.hasMany(ChatMessage, { as: "sender_chat_messages", foreignKey: "sender" });
ChatUser.belongsTo(User, { as: "user_user", foreignKey: "user" });
User.hasMany(ChatUser, { as: "chat_users", foreignKey: "user" });
OneTimePassword.belongsTo(User, { as: "user_user", foreignKey: "user" });
User.hasMany(OneTimePassword, { as: "oneTimePasswords", foreignKey: "user" });
PhysicianAgendaConfiguration.belongsTo(User, {
  as: "physician_user",
  foreignKey: "physician",
});
User.hasMany(PhysicianAgendaConfiguration, {
  as: "physician_agenda_configurations",
  foreignKey: "physician",
});
PhysicianSpecialty.belongsTo(User, {
  as: "physician_user",
  foreignKey: "physician",
});
User.hasMany(PhysicianSpecialty, {
  as: "physicianSpecialties",
  foreignKey: "physician",
});
SociodemographicDetails.belongsTo(User, {
  as: "patient_user",
  foreignKey: "patient",
});
User.hasOne(SociodemographicDetails, {
  as: "socDemDet",
  foreignKey: "patient",
});
VitalSignDetails.belongsTo(User, {
  as: "measSourceUser",
  foreignKey: "measure_source",
});
VitalSignDetails.belongsTo(SelfEvaluationEvent, {
  as: "measSelfEE",
  foreignKey: "patient",
});
SelfEvaluationEvent.hasMany(VitalSignDetails, {
  as: "vitalSigns",
  foreignKey: "selfEvaluationEvent",
});
User.hasMany(VitalSignDetails, {
  as: "vital_sign_details",
  foreignKey: "measure_source",
});
VitalSignDetails.belongsTo(User, { as: "patient_user", foreignKey: "patient" });
User.hasMany(VitalSignDetails, {
  as: "patientVitalSignDetails",
  foreignKey: "patient",
});
PhysicianDetails.belongsTo(User, {
  as: "physicianUser",
  foreignKey: "physician",
});
VitalSignDetails.belongsTo(AppointmentScheduling, {
  as: "appointmentSchedulingSings",
  foreignKey: "scheduling",
});
AppointmentScheduling.hasMany(VitalSignDetails, {
  as: "vitalSignDetailsScheduling",
  foreignKey: "scheduling",
});
VitalSignDetails.belongsTo(MedicalEvent, {
  as: "medicalEventSings",
  foreignKey: "medicalEvent",
});
MedicalEvent.hasMany(VitalSignDetails, {
  as: "vitalSignDetailsMedicalEvent",
  foreignKey: "medicalEvent",
});
User.hasOne(PhysicianDetails, {
  as: "physicianDetails",
  foreignKey: "physician",
});
PhysicianDetails.belongsTo(CatPhysicianExpertiseLevel, {
  as: "physicianExpertiseLevel",
  foreignKey: "expertiseLevel",
});
CatPhysicianExpertiseLevel.hasMany(PhysicianDetails, {
  as: "physicianDetails",
  foreignKey: "expertiseLevel",
});
CatCity.belongsTo(CatProvince, { as: "cityProvince", foreignKey: "province" });
CatCountry.hasMany(CatProvince, { as: "catProvinces", foreignKey: "country" });
User.belongsTo(CatCountry, {
  as: "userNationality",
  foreignKey: "nationality",
});
// CatCountry.hasMany(User, {as: "users", foreignKey: "nationality"});
PhysicianMedicalRegistry.belongsTo(CatMedicalRegistrationType, {
  as: "medicalRegistrationType",
  foreignKey: "registryType",
});
CatMedicalRegistrationType.hasMany(PhysicianMedicalRegistry, {
  as: "physicianMedicalRegistries",
  foreignKey: "registryType",
});
PhysicianAgendaConfiguration.belongsTo(PhysicianAttendancePlace, {
  as: "attendacePlacePhysicianAttendancePlace",
  foreignKey: "attendacePlace",
});
PhysicianAttendancePlace.hasMany(PhysicianAgendaConfiguration, {
  as: "physicianAgendaConfigurations",
  foreignKey: "attendacePlace",
});
PhysicianAttendancePlace.belongsTo(User, {
  as: "physicianUser",
  foreignKey: "physician",
});
User.hasMany(PhysicianAttendancePlace, {
  as: "physicianAttendancePlaces",
  foreignKey: "physician",
});
PhysicianMedicalRegistry.belongsTo(User, {
  as: "physicianUser",
  foreignKey: "physician",
});
User.hasMany(PhysicianMedicalRegistry, {
  as: "physicianMedicalRegistries",
  foreignKey: "physician",
});
User.belongsTo(CatCity, {
  as: "currentLocationCatCity",
  foreignKey: "currentLocation",
});
CatProvince.belongsTo(CatCountry, {
  as: "provinceCountry",
  foreignKey: "country",
});
CatProvince.hasMany(CatCity, { as: "catCities", foreignKey: "province" });

MedicalProcedurePrescription.belongsTo(CatMedicalProcedure, {
  as: "catMedicalProcedure",
  foreignKey: "medicalProcedure",
});
CatMedicalProcedure.hasMany(MedicalProcedurePrescription, {
  as: "medicalProcedurePrescriptions",
  foreignKey: "medicalProcedure",
});
CatMedicalProcedure.belongsTo(CatMedicalProcedureType, {
  as: "catMedicalProcedureType",
  foreignKey: "procedureType",
});
CatMedicalProcedureType.hasMany(CatMedicalProcedure, {
  as: "catMedicalProcedures",
  foreignKey: "procedureType",
});
MedicalReferral.belongsTo(CatMedicalSpecialty, {
  as: "specialtyCatMedicalSpecialty",
  foreignKey: "specialty",
});
CatMedicalSpecialty.hasMany(MedicalReferral, {
  as: "medicalReferrals",
  foreignKey: "specialty",
});
MedicalIndications.belongsTo(MedicalEvent, {
  as: "medicalEventMedicalEvent",
  foreignKey: "medicalEvent",
});
MedicalEvent.hasMany(MedicalIndications, {
  as: "medicalIndications",
  foreignKey: "medicalEvent",
});
MedicalProcedurePrescription.belongsTo(MedicalEvent, {
  as: "medicalEventMedicalEvent",
  foreignKey: "medicalEvent",
});
MedicalEvent.hasMany(MedicalProcedurePrescription, {
  as: "procedurePrescriptions",
  foreignKey: "medicalEvent",
});
MedicalReferral.belongsTo(MedicalEvent, {
  as: "medicalEventMedicalEvent",
  foreignKey: "medicalEvent",
});
MedicalEvent.hasMany(MedicalReferral, {
  as: "medicalReferrals",
  foreignKey: "medicalEvent",
});

MedicalReferral.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(MedicalReferral, {
  as: "medicalReferrals",
  foreignKey: "patient",
});
MedicalReferral.belongsTo(User, {
  as: "prescribedByUser",
  foreignKey: "prescribedBy",
});
User.hasMany(MedicalReferral, {
  as: "prescribedByMedicalReferrals",
  foreignKey: "prescribedBy",
});

SociodemographicDetails.belongsTo(CatCivilStatus, {
  as: "catCivilStatus",
  foreignKey: "civilStatus",
});
SociodemographicDetails.belongsTo(CatEducationalLevel, {
  as: "catEducationalLevel",
  foreignKey: "educationalLevel",
});
SociodemographicDetails.belongsTo(CatGenre, {
  as: "catGenre",
  foreignKey: "genre",
});
SociodemographicDetails.belongsTo(CatHealthCarePlan, {
  as: "catHealthCarePlan",
  foreignKey: "healthCarePlan",
});
SociodemographicDetails.belongsTo(User, {
  as: "patientUser",
  foreignKey: "patient",
});
PatientPhysicalExamination.belongsTo(CatPhysicalSubsystem, {
  as: "catPhysicalSubsystem",
  foreignKey: "physicalSubsystem",
});
PatientPhysicalExamination.belongsTo(MedicalEvent, {
  as: "medicalEventMedicalEvent",
  foreignKey: "medicalEvent",
});
MedicalEvent.hasMany(PatientPhysicalExamination, {
  as: "patientPhysicalExaminations",
  foreignKey: "medicalEvent",
});
User.hasMany(PhysicianReview, {
  as: "patienPhysicianReview",
  foreignKey: "patientId",
});
PhysicianReview.belongsTo(User, {
  as: "patientPatienPhysicianReview",
  foreignKey: "patientId",
});
User.hasMany(PhysicianReview, {
  as: "physicianReview",
  foreignKey: "physicianId",
});
PhysicianReview.belongsTo(User, { as: "physician", foreignKey: "physicianId" });
User.hasMany(PatientReview, {
  as: "physicianPatientReview",
  foreignKey: "physicianId",
});
PatientReview.belongsTo(User, {
  as: "physicianPhysicianPatientReview",
  foreignKey: "physicianId",
});
User.hasMany(PatientReview, { as: "patientReview", foreignKey: "patientId" });
PatientReview.belongsTo(User, { as: "patient", foreignKey: "patientId" });
User.hasMany(LoginRecord, { as: "loginRecord", foreignKey: "id" });
PatientCardiovascularRisk.belongsTo(CatRisk, {
  as: "catCvRisk",
  foreignKey: "risk",
});
PatientHeartFailureClassification.belongsTo(CatHeartFailureClassification, {
  as: "CatHeartFailureClass",
  foreignKey: "heartFailureClassification",
});
CatHeartFailureClassification.hasMany(PatientHeartFailureClassification, {
  as: "patientHeartFailureClassifications",
  foreignKey: "heartFailureClassification",
});
PatientPulmonaryHypertensionRisk.belongsTo(
  CatRisk,
  { as: "catHpRisk", foreignKey: "pulmonaryHypertensionRisk" }
);
CatRisk.hasMany(PatientPulmonaryHypertensionRisk, {
  as: "patPHRisks",
  foreignKey: "pulmonaryHypertensionRisk",
});
PatientCardiovascularRisk.belongsTo(User, {
  as: "patientUser",
  foreignKey: "patient",
});
User.hasOne(PatientCardiovascularRisk, {
  as: "ptCvRsks",
  foreignKey: "patient",
});
PatientCardiovascularRisk.belongsTo(User, {
  as: "physicianUser",
  foreignKey: "physician",
});
User.hasMany(PatientCardiovascularRisk, {
  as: "physicianPatientCardiovascularRisks",
  foreignKey: "physician",
});
PatientHeartFailureClassification.belongsTo(User, {
  as: "patientUser",
  foreignKey: "patient",
});
User.hasMany(PatientHeartFailureClassification, {
  as: "patientHeartFailureClassifications",
  foreignKey: "patient",
});
PatientHeartFailureClassification.belongsTo(User, {
  as: "physicianUser",
  foreignKey: "physician",
});
User.hasMany(PatientHeartFailureClassification, {
  as: "physicianPatientHeartFailureClassifications",
  foreignKey: "physician",
});
PatientPulmonaryHypertensionRisk.belongsTo(User, {
  as: "patientUser",
  foreignKey: "patient",
});
User.hasMany(PatientPulmonaryHypertensionRisk, {
  as: "patPHRisks",
  foreignKey: "patient",
});
PatientPulmonaryHypertensionRisk.belongsTo(User, {
  as: "physicianUser",
  foreignKey: "physician",
});
User.hasMany(PatientPulmonaryHypertensionRisk, {
  as: "physicianPatientPulmonaryHypertensionRisks",
  foreignKey: "physician",
});
PatientPainMap.belongsTo(AppointmentScheduling, {
  as: "schedulingAppointmentScheduling",
  foreignKey: "scheduling",
});
AppointmentScheduling.hasMany(PatientPainMap, {
  as: "patientPainMap",
  foreignKey: "scheduling",
});
PatientPainMap.belongsTo(CatPainDuration, {
  as: "painDurationDetail",
  foreignKey: "painDuration",
});
CatPainDuration.hasMany(PatientPainMap, {
  as: "patientPainMaps",
  foreignKey: "painDuration",
});
PatientPainMap.belongsTo(CatPainFrequency, {
  as: "painFrequencyDetail",
  foreignKey: "painFrequency",
});
CatPainFrequency.hasMany(PatientPainMap, {
  as: "patientPainMaps",
  foreignKey: "painFrequency",
});
PatientPainMap.belongsTo(CatPainScale, {
  as: "painScaleDetail",
  foreignKey: "painScale",
});
CatPainScale.hasMany(PatientPainMap, {
  as: "patientPainMaps",
  foreignKey: "painScale",
});
PatientPainMap.belongsTo(CatPainType, {
  as: "painTypeDetail",
  foreignKey: "painType",
});
CatPainType.hasMany(PatientPainMap, {
  as: "patientPainMaps",
  foreignKey: "painType",
});
PatientPainMap.belongsTo(MedicalEvent, {
  as: "medicalEventMedicalEvent",
  foreignKey: "medicalEvent",
});
MedicalEvent.hasOne(PatientPainMap, {
  as: "patientPainMap",
  foreignKey: "medicalEvent",
});
PatientPainMap.belongsTo(User, {
  as: "painOwnerUser",
  foreignKey: "painOwner",
});
User.hasMany(PatientPainMap, {
  as: "patientPainMaps",
  foreignKey: "painOwner",
});
PatientPainMap.belongsTo(User, {
  as: "painRecorderUser",
  foreignKey: "painRecorder",
});
User.hasMany(PatientPainMap, {
  as: "painRecorderPatientPainMaps",
  foreignKey: "painRecorder",
});
PatientPulmonaryHypertensionGroup.belongsTo(CatPulmonaryHypertensionGroup, {
  as: "catHpGroup",
  foreignKey: "group", // La columna 'group' en PatientPulmonaryHypertensionGroup
  targetKey: "id", // La columna 'id' en CatPulmonaryHypertensionGroup
});
CatPulmonaryHypertensionGroup.hasMany(PatientPulmonaryHypertensionGroup, {
  as: "hpGroup",
  foreignKey: "group",
});

PatientSurgicalRisk.belongsTo(CatRisk, {
  as: "catSurgicalRisk",
  foreignKey: "risk",
});
CatRisk.hasMany(PatientSurgicalRisk, {
  as: "surgicalRisk",
  foreignKey: "risk",
});
PatientPulmonaryHypertensionGroup.belongsTo(User, {
  as: "patientHpGroup",
  foreignKey: "patient",
});
User.hasMany(PatientPulmonaryHypertensionGroup, {
  as: "userHpGroups",
  foreignKey: "patient",
});
PatientPulmonaryHypertensionGroup.belongsTo(User, {
  as: "physicianHpGroup",
  foreignKey: "physician",
});
User.hasMany(PatientPulmonaryHypertensionGroup, {
  as: "physicianUserHpGroups",
  foreignKey: "physician",
});
PatientSurgicalRisk.belongsTo(User, {
  as: "patientUser",
  foreignKey: "patient",
});
User.hasOne(PatientSurgicalRisk, { as: "patSgRisks", foreignKey: "patient" });
PatientSurgicalRisk.belongsTo(User, {
  as: "physicianUser",
  foreignKey: "physician",
});
User.hasMany(PatientSurgicalRisk, {
  as: "physicianSurgicalRisks",
  foreignKey: "physician",
});
User.hasOne(UserCurrentLocation, {
  as: "currentLocationUser",
  foreignKey: "user",
});
UserCurrentLocation.belongsTo(User, {
  as: "userCurrentLocation",
  foreignKey: "user",
});
AppointmentScheduling.belongsTo(CatAppointmentModality, {
  as: "appointmentModality",
  foreignKey: "typeOfMedicalConsultation",
});
CatAppointmentModality.hasMany(AppointmentScheduling, {
  as: "appointmentSchedulings",
  foreignKey: "typeOfMedicalConsultation",
});
AppointmentScheduling.belongsTo(PhysicianAttendancePlace, {
  as: "attendancePlace",
  foreignKey: "healthCenter",
});
PhysicianAttendancePlace.hasMany(AppointmentScheduling, {
  as: "appointmentSchedulings",
  foreignKey: "healthCenter",
});
User.hasMany(AlarmEvent, { as: "patientAlarms", foreignKey: "patient" });
AlarmEvent.belongsTo(User, { as: "AlarmForPatient", foreignKey: "patient" });
ProvisionalPreConsultation.belongsTo(User, {
  as: "provisionalPreConsultationUser",
  foreignKey: "patient",
});
User.hasMany(ProvisionalPreConsultation, {
  as: "provisionalPreConsultationUser",
  foreignKey: "patient",
});
ProvisionalPreConsultation.belongsTo(AppointmentScheduling, {
  as: "ProvisionalPreConsultation",
  foreignKey: "appointment_schedule",
});
AppointmentScheduling.hasOne(ProvisionalPreConsultation, {
  as: "ProvisionalPreConsultation",
  foreignKey: "appointment_schedule",
});
ProvisionalPreConsultation.belongsTo(PatientPainMap, {
  as: "provisionalPreConsultationPainMap",
  foreignKey: "physical_examination",
});
PatientPainMap.hasOne(ProvisionalPreConsultation, {
  as: "provisionalPreConsultationPainMap",
  foreignKey: "physical_examination",
});
Backgrounds.belongsTo(MedicalEvent, {
  as: "medicalEventMedicalBackgrounds",
  foreignKey: "medicalEvent",
});
MedicalEvent.hasOne(Backgrounds, {
  as: "background",
  foreignKey: "medicalEvent",
});
Backgrounds.belongsTo(User, { as: "patientUser", foreignKey: "patient" });
User.hasMany(Backgrounds, { as: "backgrounds", foreignKey: "patient" });
User.hasMany(DoctorSchedule, { foreignKey: "doctor_id" });
DoctorSchedule.belongsTo(User, { foreignKey: "doctor_id" });
User.hasMany(PhysicianFavoritePatient, {
  foreignKey: "favoritePatient",
  as: "favorites",
});
User.hasMany(PhysicianFavoritePatient, {
  foreignKey: "physicianId",
  as: "physicianFavorites",
});
PhysicianFavoritePatient.belongsTo(User, {
  foreignKey: "favoritePatient",
  as: "user",
});
PhysicianFavoritePatient.belongsTo(User, {
  foreignKey: "physicianId",
  as: "physician",
});
User.belongsTo(PhysicianDetails, {
  as: "treatingPhysicianId",
  foreignKey: "treatingPhysician",
});
PhysicianDetails.hasMany(User, {
  as: "treatingPhysician",
  foreignKey: "treatingPhysician",
});
AppointmentScheduling.hasMany(PatientPhysicalExamination, {
  as: "physicalAppointment",
  foreignKey: "appointment_scheduling",
});
PatientPhysicalExamination.belongsTo(AppointmentScheduling, {
  as: "physicalAppointment",
  foreignKey: "appointment_scheduling",
});
AppointmentScheduling.hasMany(Backgrounds, {
  as: "backgroundAppointment",
  foreignKey: "appointment_scheduling",
});
Backgrounds.belongsTo(AppointmentScheduling, {
  as: "backgroundAppointment",
  foreignKey: "appointment_scheduling",
});

// Center Attention
SociodemographicDetails.belongsTo(CatCenterAttention, {
  as: "catCenterAttention",
  foreignKey: "centerAttention",
});
CatCenterAttention.hasMany(SociodemographicDetails, {
  as: "sociodemographicDetails",
  foreignKey: "centerAttention",
});

AppointmentScheduling.belongsTo(CatCenterAttention, {
  as: "healthCenterDetails", // Alias para usar en las consultas
  foreignKey: "healthCenter", // Clave foránea en AppointmentScheduling
  targetKey: "id", // Clave primaria en CatCenterAttention
});

// Relación inversa en CatCenterAttention.js (opcional)
CatCenterAttention.hasMany(AppointmentScheduling, {
  as: "appointments", // Alias para la relación inversa
  foreignKey: "healthCenter", // Clave foránea en AppointmentScheduling
  sourceKey: "id", // Clave primaria en CatCenterAttention
});

CatCenterAttention.belongsTo(CatCity, { foreignKey: "city" });
CatCity.hasMany(CatCenterAttention, { foreignKey: "city" });

User.hasOne(PhysicianOnboarding, { foreignKey: "idPhysician" });
PhysicianOnboarding.belongsTo(User, { foreignKey: "idPhysician" });
PhysicianOnboarding.belongsTo(CatGenre, { foreignKey: "genre" });
PhysicianOnboarding.belongsTo(CatCenterAttention, {
  foreignKey: "centerAttention",
});
PhysicianOnboarding.belongsToMany(CatCenterAttention, {
  through: AttendentPlace,
  foreignKey: "idPhysician",
});
CatCenterAttention.belongsToMany(PhysicianOnboarding, {
  through: AttendentPlace,
  foreignKey: "idCenterAttention",
});
// Relaciones del modelo MedicalInterconsultations

User.hasOne(MedicalInterconsultations, {
  foreignKey: "physicianRequester",
  as: "requestingPhysician",
});
MedicalInterconsultations.belongsTo(User, {
  foreignKey: "physicianRequester",
  as: "requestingPhysician",
});
User.hasOne(MedicalInterconsultations, {
  foreignKey: "patient",
  as: "patientDetails",
});
MedicalInterconsultations.belongsTo(User, {
  foreignKey: "patient",
  as: "patientDetails",
});
User.hasOne(MedicalInterconsultations, {
  foreignKey: "physicianQueried",
  as: "queriedPhysician",
});
MedicalInterconsultations.belongsTo(User, {
  foreignKey: "physicianQueried",
  as: "queriedPhysician",
});
MedicalInterconsultations.hasMany(MedicalInterconsultationFile, {
  foreignKey: "medicalInterconsultationId",
  as: "files",
});
MedicalInterconsultationFile.belongsTo(MedicalInterconsultations, {
  foreignKey: "medicalInterconsultationId",
});

AlarmEvent.belongsTo(User, { as: "patient_user", foreignKey: "patient" });

User.hasOne(RefreshToken, { foreignKey: "userId", as: "refreshToken" });
RefreshToken.belongsTo(User, { foreignKey: "userId", as: "user" });

CatDrug.hasMany(CatCommercialNameDrug, {
  foreignKey: "drugId",
  as: "commercialDrugsName",
});
CatCommercialNameDrug.belongsTo(CatDrug, {
  foreignKey: "drugId",
  as: "drugNames",
});

DrugDetailPresentation.belongsTo(CatDrug, {
  foreignKey: "drugId",
  as: "drugName",
});
CatDrug.hasMany(DrugDetailPresentation, {
  foreignKey: "drugId",
  as: "drugDetailPresentation",
});

DrugDetailPresentation.belongsTo(CatDrugPresentation, {
  foreignKey: "presentationId",
  as: "presentation",
});
CatDrugPresentation.hasMany(DrugDetailPresentation, {
  foreignKey: "presentationId",
  as: "presentation",
});

DrugDetailPresentation.belongsTo(CatMeasureUnit, {
  foreignKey: "measureUnitId",
  as: "measureUnit",
});
CatMeasureUnit.hasMany(DrugDetailPresentation, {
  foreignKey: "measureUnitId",
  as: "measureUnit",
});

DrugDetailPresentation.belongsTo(CatRouteOfAdministration, {
  foreignKey: "routeOfAdministrationId",
  as: "routeOfAdministration",
});
CatRouteOfAdministration.hasMany(DrugDetailPresentation, {
  foreignKey: "routeOfAdministrationId",
  as: "routeOfAdministration",
});

MedicationPrescription.belongsTo(MedicalEvent, {
  foreignKey: "medicalEventId",
  as: "medicalEvent",
});
MedicalEvent.hasMany(MedicationPrescription, {
  foreignKey: "medicalEventId",
  as: "prescriptions",
});

MedicationPrescription.belongsTo(User, {
  foreignKey: "patientId",
  as: "patient",
});
User.hasMany(MedicationPrescription, {
  foreignKey: "patientId",
  as: "patientPrescriptions",
});

MedicationPrescription.belongsTo(User, {
  foreignKey: "physicianId",
  as: "physician",
});
User.hasMany(MedicationPrescription, {
  foreignKey: "physicianId",
  as: "physicianPrescription",
});

PrescriptionModificationsHistory.belongsTo(MedicationPrescription, {
  foreignKey: "medicationPrescriptionId",
  as: "prescriptionModificationHistory",
});
MedicationPrescription.hasMany(PrescriptionModificationsHistory, {
  foreignKey: "medicationPrescriptionId",
  as: "medicationPrescription",
});

PrescriptionModificationsHistory.belongsTo(MedicalEvent, {
  foreignKey: "medicalEventId",
  as: "prescriptionHistory",
});
MedicalEvent.hasMany(PrescriptionModificationsHistory, {
  foreignKey: "medicalEventId",
  as: "prescriptionHistory",
});

PrescriptionModificationsHistory.belongsTo(User, {
  foreignKey: "physicianId",
  as: "physicianModification",
});
User.hasMany(PrescriptionModificationsHistory, {
  foreignKey: "physicianId",
  as: "prescriptionModified",
});

PrescriptionModificationsHistory.belongsTo(DrugDetailPresentation, {
  foreignKey: "drugDetailPresentationId",
  as: "drugDetailPresentations",
});
DrugDetailPresentation.hasMany(PrescriptionModificationsHistory, {
  foreignKey: "drugDetailPresentationId",
  as: "drugDetailPresentation",
});
PrescriptionModificationsHistory.belongsTo(CatCommercialNameDrug, {
  foreignKey: "commercialNameDrugId",
  as: "commercialName",
});
CatCommercialNameDrug.hasMany(PrescriptionModificationsHistory, {
  foreignKey: "commercialNameDrugId",
  as: "CommercialNamePrescription",
});
User.hasMany(PatientMedicalReq, { foreignKey: "patientId", as: "patient" });
User.hasMany(PatientMedicalReq, { foreignKey: "physicianId", as: "physician" });
PatientMedicalReq.belongsTo(User, {
  foreignKey: "patientId",
  as: "patientReq",
});
PatientMedicalReq.belongsTo(User, {
  foreignKey: "physicianId",
  as: "physicianReq",
});
CatStudyType.hasMany(PatientStudies, {
  as: "CatStudyType",
  foreignKey: "studyType",
});
PatientStudies.belongsTo(CatStudyType, {
  as: "CatStudyType",
  foreignKey: "studyType",
});
AppointmentScheduling.hasMany(PatientStudies, {
  as: "appointmentStudies",
  foreignKey: "schedule",
});
PatientStudies.belongsTo(AppointmentScheduling, {
  as: "patientStudies",
  foreignKey: "schedule",
});
User.hasMany(PhysicianOrders, {
  foreignKey: "physicianId",
  as: "OrdersPhysician",
});
PhysicianOrders.belongsTo(User, { foreignKey: "physicianId", as: "physician" });

User.hasMany(PhysicianOrders, { foreignKey: "patientId", as: "OrdersPatient" });
PhysicianOrders.belongsTo(User, { foreignKey: "patientId", as: "patient" });

PatientMedicalReq.hasOne(PhysicianOrders, {
  as: "medicalReq",
  foreignKey: "requestPatientId",
});

PhysicianOrders.belongsTo(PatientMedicalReq, {
  as: "medicalReq",
  foreignKey: "requestPatientId",
});
PhysicianOrders.hasMany(MedicationPrescription, {
  foreignKey: "medicalOrderId",
  as: "medicationPrescription",
});
MedicationPrescription.belongsTo(PhysicianOrders, {
  foreignKey: "medicalOrderId",
  as: "physicianOrdersMedication",
});
// SelEvaluation
User.hasMany(SelfEvaluationEvent, {
  foreignKey: "patient",
  as: "selfEvaluations",
});

PrescriptionModificationsHistory.belongsTo(PhysicianOrders, {
  foreignKey: "medicalOrderId",
  as: "medicalOrder",
});

PhysicianOrders.belongsTo(SubCategoriesCieDiez, {
  foreignKey: "diagnostic",
  as: "orderDiagnostic",
});
SubCategoriesCieDiez.hasOne(PhysicianOrders, {
  foreignKey: "diagnostic",
  as: "physicianOrder",
});

SelfEvaluationEvent.belongsTo(User, {
  foreignKey: "patient",
  as: "patientUser",
});

SelfEvaluationEvent.hasOne(PatientPainMap, {
  foreignKey: "selfEvaluationEvent",
  as: "patientPainMap",
});

PatientPainMap.belongsTo(SelfEvaluationEvent, {
  foreignKey: "selfEvaluationEvent",
  as: "selfEvaluation",
});

CategoryCieDiez.hasMany(SubCategoriesCieDiez, {
  foreignKey: "categoryId",
  as: "subCategories",
});
SubCategoriesCieDiez.belongsTo(CategoryCieDiez, {
  foreignKey: "categoryId",
  as: "category",
});
PatientDiagnostics.belongsTo(MedicalEvent, {
  foreignKey: "medicalEvent",
  as: "medicalEventDiagnostic",
});

MedicalEvent.hasMany(PatientDiagnostics, {
  foreignKey: "medicalEvent",
  as: "medicalEventDiagnostics",
});

PatientDiagnostics.belongsTo(SubCategoriesCieDiez, {
  foreignKey: "diagnostic",
  as: "cie10subCategory",
});
SubCategoriesCieDiez.hasMany(PatientDiagnostics, {
  foreignKey: "diagnostic",
  as: "diagnostic",
});
SelfEvaluationEvent.hasMany(GlycemiaRecords, {
  foreignKey: "selfEvaluationEvent",
  as: "glycemia",
});

CatComorbiditiesCategories.hasMany(CatComorbiditiesDiseases, {
  foreignKey: "categoryId",
  as: "diseases",
});
CatComorbiditiesDiseases.belongsTo(CatComorbiditiesCategories, {
  foreignKey: "categoryId",
  as: "category",
});

User.hasMany(UserComorbidities, {
  foreignKey: "patientId",
  as: "comorbidities",
});

UserComorbidities.belongsTo(User, {
  foreignKey: "patientId",
  as: "user",
});

CatComorbiditiesDiseases.hasMany(UserComorbidities, {
  foreignKey: "diseaseId",
  as: "userComorbidities",
});

UserComorbidities.belongsTo(CatComorbiditiesDiseases, {
  foreignKey: "diseaseId",
  as: "disease",
});

MedicalEvent.belongsTo(CatConsultationReason, {
  foreignKey: "reasonForConsultationId",
  as: "reasonForConsultation", 
});

CatConsultationReason.hasMany(MedicalEvent, {
  foreignKey: "reasonForConsultationId",
  as: "medicalEvents",
});
MedicalEvent.belongsTo(SubCategoriesCieDiez, {
  foreignKey: "primaryDiagnostic", 
  as: "mainDiagnostic",
});


SubCategoriesCieDiez.hasOne(MedicalEvent, {
  foreignKey: "primaryDiagnostic",
  as: "medicalEvent",
});

const models = {
  AppointmentScheduling,
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
  PatientCardiovascularRisk,
  PatientHeartFailureClassification,
  CatHeartFailureClassification,
  PatientPulmonaryHypertensionRisk,
  CatRisk,
  PatientPainMap,
  CatPainAreas,
  CatPainDuration,
  CatPainFrequency,
  CatPainScale,
  CatPainType,
  CatPulmonaryHypertensionGroup,
  PatientPulmonaryHypertensionGroup,
  PatientSurgicalRisk,
  AlarmEvent,
  ProvisionalPreConsultation,
  Backgrounds,
  DoctorSchedule,
  PhysicianFavoritePatient,
  CatCenterAttention,
  RefreshToken,
  PhysicianOnboarding,
  CatRouteOfAdministration,
  CatCommercialNameDrug,
  DrugDetailPresentation,
  MedicationPrescription,
  PrescriptionModificationsHistory,
  MedicalInterconsultations,
  MedicalInterconsultationFile,
  PatientMedicalReq,
  PhysicianOrders,
  AttendentPlace,
  CatStudyType,
  PatientStudies,
  SelfEvaluationEvent,
  CategoryCieDiez,
  SubCategoriesCieDiez,
  PatientDiagnostics,
  GlycemiaRecords,
  CatComorbiditiesCategories,
  CatComorbiditiesDiseases,
  UserComorbidities,
  CatConsultationReason,
};

export default models;

export { sequelize };
