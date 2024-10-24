import { Router } from "express";
import getPatientsController from "../controllers/patient/getPatientsController.js";
import getPatientsFilterController from "../controllers/patient/getPatientsFilterController.js";
import getPatientController from "../controllers/patient/getPatientController.js";
import patchPatientController from "../controllers/patient/patchPatientController.js";
import deletePatientController from "../controllers/patient/deletePatientController.js";
import getAllPhysiciansController from "../controllers/physician/getAllPhysiciansController.js";
import getPhysicianByNameLikeController from "../controllers/physician/getPhysicianByNameLikeController.js";
import getPhysiciansBySpecialtyIdController from "../controllers/physician/getPhysiciansBySpecialtyIdController.js";
import updatePhysicianMedicalRegistryController from "../controllers/physician/updatePhysicianMedicalRegistryController.js";
import updatePhysicianAttendancePlaceController from "../controllers/physician/updatePhysicianAttendancePlaceController.js";
import userRegisterController from "../controllers/user/userRegisterController.js";
import otpMailValidationController from "../controllers/user/otpMailValidationController.js";
import userLoginController from "../controllers/user/userLoginController.js";
import getAllLoginRecordController from "../controllers/LoginRecord/getLoginRecordController.js";
import recoverPasswordController from "../controllers/user/recoverPasswordController.js";
import modifyPasswordWithOtpController from "../controllers/user/modifyPasswordWithOtpController.js";
import getCatalogController from "../controllers/catalog/getCatalogController.js";
import createSchedulingController from "../controllers/scheduling/createSchedulingController.js";
import getAllUsersController from "../controllers/user/getAllUsersController.js";
import getAllSchedulesController from "../controllers/scheduling/getAllSchedulesController.js";
import patchScheduleController from "../controllers/scheduling/patchScheduleController.js";
import deleteSchedulingController from "../controllers/scheduling/deleteSchedulingController.js";
import createPhysicianReviewController from "../controllers/physician/reviewPhysician/createPhysicianReviewController.js";
import getAllReviewsForPhisicianController from "../controllers/physician/reviewPhysician/getAllReviewsForPhysicianController.js";
import getAllReviewsMadeByPatientController from "../controllers/physician/reviewPhysician/getAllReviewsMadeByPatientController.js";
import patchPhysicianReviewController from "../controllers/physician/reviewPhysician/patchPhysicianReviewController.js";
import getGenderDistributionController from "../controllers/statisticalCenter/getGenderDistributionController.js";
import getPatientActivityDistributionController from "../controllers/statisticalCenter/getPatientActivityDistributionController.js";
import getGeneralStatisticsController from "../controllers/statisticalCenter/getGeneralStatisticsController.js";
import createDrugPrescriptionController from "../controllers/drugPrescription/createDrugPrescriptionController.js";
import createMedicalProcedurePrescriptionController from "../controllers/medicalProcedurePrescription/createMedicalProcedurePrescriptionController.js";
import createMedicalReferralController from "../controllers/medicalReferral/createMedicalReferralController.js";
import createPatientPhysicalExaminationController from "../controllers/patient/patientPhysicianExamCtrls/createPatientPhysicalExaminationController.js";
import updatePatientPhysicalExaminationController from "../controllers/patient/patientPhysicianExamCtrls/updatePatientPhysicalExaminationController.js";
import updateMedicalReferralController from "../controllers/medicalReferral/updateMedicalReferralController.js";
import updateMedicalProcedurePrescriptionController from "../controllers/medicalProcedurePrescription/updateMedicalProcedurePrescriptionController.js";
import updateDrugPrescriptionController from "../controllers/drugPrescription/updateDrugPrescriptionController.js";
import createPhysicianMedicalRegisterController from "../controllers/physician/createPhysicianMedicalRegisterController.js";
import createPhysicianAttendancePlaceController from "../controllers/physician/createPhysicianAttendancePlaceController.js";
import createPhysicianSpecialtyController from "../controllers/physician/createPhysicianSpecialtyController.js";
import updatePhysicianSpecialtyController from "../controllers/physician/updatePhysicianSpecialtyController.js";
import createPhysicianFavoritePatientController from "../controllers/physician/createPhysicianFavoritePatientController.js";
import deletePhysicianFavoritePatientController from "../controllers/physician/deletePhysicianFavoritePatientController.js";
import getPhysicianFavoritePatientController from "../controllers/physician/getPhysicianFavoritePatientController.js";
import createMedicalIndicationsController from "../controllers/medicalIndications/createMedicalIndicationsController.js";
import createPatientReviewController from "../controllers/patient/reviewPatient/createPatientReviewController.js";
import getAllReviewsForPatientController from "../controllers/patient/reviewPatient/getAllReviewsForPatientController.js";
import getAllReviewsMadeByPhysicianController from "../controllers/patient/reviewPatient/getAllReviewsMadeByPhysicianController.js";
import patchPatientReviewController from "../controllers/patient/reviewPatient/patchPatientReviewController.js";
import getUserController from "../controllers/user/getUserController.js";
import updateUserInformationController from "../controllers/user/updateUserInformationController.js";
import createHeartFailureClassificationController from "../controllers/patient/patientRisk/createHeartFailureClassificationController.js";
import createPulmonaryHypertensionRiskController from "../controllers/patient/patientRisk/createPulmonaryHypertensionRiskController.js";
import createPatientPainMapController from "../controllers/painMap/createPatientPainMapController.js";
import updatePhysicianController from "../controllers/physician/updateFullPhysician.js";
import updateMedicalEventController from "../controllers/medicalEvent/updateMedicalEventController.js";
import createSociodemographicDetailsController from "../controllers/sociodemographicDetails/createSociodemographicDetailsController.js";
import updateSociodemographicDetailsController from "../controllers/sociodemographicDetails/updateSociodemographicDetailsController.js";
import createPatientHpGroupController from "../controllers/patient/createPatientHpGroupController.js";
import updatePatientHpGroupController from "../controllers/patient/updatePatientHpGroupController.js";
import updateHeartFailureClassificationController from "../controllers/patient/patientRisk/updateHeartFailureClassificationController.js";
import updateFullPatientController from "../controllers/patient/updateFullPatientController.js";
import getMedicalEventHistoryEvolutionController from "../controllers/medicalHistory/getMedicalEventHistoryEvolution.js";
import createBackgroundsController from "../controllers/backgrounds/createBackgroundsController.js";
import createAlarmEventController from "../controllers/alarmEvent/createAlarmEventController.js";
import getAllAlarmsForPatientController from "../controllers/alarmEvent/getAllAlarmsForPatientController.js";
import patchAlarmEventController from "../controllers/alarmEvent/patchAlarmEventController.js";
import getAllProvisionaPreConsultationPatientController from "../controllers/patient/preConsultation/getAllProvisionaPreConsultationPatientController.js";
import patchProvisionalPreConsultationController from "../controllers/patient/preConsultation/patchProvisionalPreConsultationController.js";
import createSchedule from "../controllers/managementSchedule/createAttention.js";
import updateSchedule from "../controllers/managementSchedule/updateSchedule.js";
import deleteSchedule from "../controllers/managementSchedule/deleteSchedule.js";
import patchPatientPainMapController from "../controllers/painMap/patchPatientPainMapController.js";
import getPreConsultationByScheduleIdController from "../controllers/patient/preConsultation/getPreConsultationByScheduleIdController.js";
import getAllNotificationsPatienController from "../controllers/notifications/getAllNotificationsPatienController.js";
import getAllNotificationsPhysicianController from "../controllers/notifications/getAllNotificationsPhysicianController.js";
import patchNotificationsController from "../controllers/notifications/patchNotificationsController.js";
import getSchedules from "../controllers/managementSchedule/getSchedule.js";
import getAllSchedulesByUserController from "../controllers/scheduling/getAllSchedulesByUserController.js";
import createOnboardingController from "../controllers/onbording/createOnbording.js";
import createPatientMedReqCtrl from "../controllers/patient/patientMedicaReq/createPatientMedReqCtrl.js";
import getPatientMedReqCtrl from "../controllers/patient/patientMedicaReq/getPatientMedReqCtrl.js";
import updatePatientMedReqCtrl from "../controllers/patient/patientMedicaReq/updatePatientMedReqCtrl.js";
import deletePatientMedReqCtrl from "../controllers/patient/patientMedicaReq/deletePatientMedReqCtrl.js";
import deleteDrugPrescriptionController from "../controllers/drugPrescription/deleteDrugPrescriptionController.js";
import getDrugPrescriptionController from "../controllers/drugPrescription/getDrugPrescriptionController.js";
import searchDrugsController from "../controllers/drugPrescription/searchDrugsController.js";
import createOrUpdateMedicalInterconsultation from "../controllers/interconsultation/MedicalInterconsultations.js";
import getMedicalInterconsultationController from "../controllers/interconsultation/getMedicalInterconsultation.js";
import getMedicalInterconsultationDetailsController from "../controllers/interconsultation/getMedicalInterconsultationDetailsController.js";
import createNewOrderPhysicianCtrl from "../controllers/physician/ordersCtrl/createOrderPhysicianCtrl.js";
import getPhysicianOrderById from "../controllers/physician/ordersCtrl/getPhysicianOrderById.js";
import postPatientStudiesController from "../controllers/patient/patientStudies/postPatientStudiesController.js";
import getFilesController from "../controllers/medicalHistory/getFilesController.js";
import getAnamnesisCtrl from "../controllers/medicalHistory/Anamnesis/getAnamnesisCtrl.js";
import getConsultationController from "../controllers/medicalHistory/getConsultationsController.js";
import getNewPatientDetailsController from "../controllers/medicalHistory/getNewPatientDetailsController.js";
import physicalSelfEvaluationController from "../controllers/painMap/physicalSelfEvaluationController.js";
import getPainMapController from "../controllers/medicalHistory/getPainMapController.js";
import patchPatientStudiesController from "../controllers/patient/patientStudies/patchPatientStudiesController.js";
import getVitalSignsController from "../controllers/medicalHistory/getVitalSignsController.js";
import createRegisterCie10Ctrl from "../controllers/cieDiezCtrl/createRegisterCie10Ctrl.js";
import getCatAndSubCatCtrl from "../controllers/cieDiezCtrl/getCat&SubCatCie10Ctrl.js";
import updateStatusSchedulingCtrl from "../controllers/scheduling/updateStatusSchedulingCtrl.js";
import searchCIEController from "../controllers/cieDiezCtrl/searchCIEController.js";
import getPatientPhysicianExamCtrl from "../controllers/medicalHistory/getPatientPhysicianExamCtrl.js";
import getDiagnosticController from "../controllers/medicalHistory/getDiagnosticsController.js";
import createSelfEvaluationVitalSignController from "../controllers/vitalSigns/createSelfEvaluationVitalSignController.js";
import searchComorbiditiesController from "../controllers/Comorbidities/searchComorbiditesController.js";
import getVitalSignsByMedicalEventController from "../controllers/vitalSigns/getVitalSignsByMedicalEventController.js";
import getGeneralConsultationController from "../controllers/medicalEvent/consultationTabs/get/getGeneralConsultationController.js";
import getConsultationTabController from "../controllers/medicalEvent/consultationTabs/get/getConsultationTabController.js";
import getPreConsultationTabController from "../controllers/medicalEvent/consultationTabs/get/getPreConsultationTabController.js";
import getBackgroundTabController from "../controllers/medicalEvent/consultationTabs/get/getBackgroundTabController.js";
import getStudiesConsultationTabController from "../controllers/medicalEvent/consultationTabs/get/getStudiesConsultationTabController.js";
import postConsultationTabController from "../controllers/medicalEvent/consultationTabs/post/postConsultationTabController.js";
import findOrCreateCardiovascularRiskController from "../controllers/patient/patientRisk/findOrCreateCardiovascularRiskController.js";
import findOrCreateSurgicalRiskController from "../controllers/patient/patientRisk/findOrCreateSurgicalRiskController.js";
import postBackgroundTabController from "../controllers/medicalEvent/consultationTabs/post/postBackgroundTabController.js";
import postGeneralConsultationTabController from "../controllers/medicalEvent/consultationTabs/post/postGeneralConsultationTabController.js";
import createVitalSignsController from "../controllers/vitalSigns/createVitalSignsController.js";
import postGlycemiaRecordsController from "../controllers/glycemiaRecords/postGlycemiaRecordsController.js";
import getLastMedicalEventController from "../controllers/medicalEvent/getLastMedicalEventController.js";
import searchHealthCarePlanController from "../controllers/sociodemographicDetails/search/searchHealthCarePlanController.js";
import getUserProfileInfoController from "../controllers/user/profile/getUserProfileInfoController.js";
import patchPhysicianFilesController from "../controllers/physician/files/patchPhysicianFilesController.js";
import deletePhysicianFileController from "../handlers/physicianHandlers/files/deletePhysicianFileHandler.js";
import getPhysicianFilesController from "../handlers/physicianHandlers/files/getPhysicianFileHandler.js";
import getMedicalHistoryController from "../controllers/medicalEvent/getMedicalHistoryController.js";
import patchUserProfileController from "../controllers/user/profile/patchUserProfileController.js";
import updateTreatingPhysicianController from "../controllers/requestTreatingPhysician/updateTreatingPhysicianController.js";
import createRequestController from "../controllers/requestTreatingPhysician/requestTreatingPhysicianController.js";
import deleteRequestController from "../controllers/requestTreatingPhysician/deleteTreatingPhysicianController.js";
import getRequestController from "../controllers/requestTreatingPhysician/getTreatingPhysicianController.js";
import tokenController from "../controllers/requestTreatingPhysician/tokenController.js";
import verificationDataPhysicians from "../utils/verificationDataPhysicians.js";
import deletePatientStudiesController from "../controllers/patient/patientStudies/deletePatientStudiesController.js";

const patientRouter = Router();
const userRouter = Router();
const getPatientsRouter = Router();
const physicianRouter = Router();
const getPatientsFilterRouter = Router();
const catalogsRouter = Router();
const schedulingRouter = Router();
const medicalEventRouter = Router();
const vitalSignsRouter = Router();
const medicalBackgroundsRouter = Router();
const statisticsRouter = Router();
const drugPrescriptionRouter = Router();
const procedurePrescriptionRouter = Router();
const medicalReferralRouter = Router();
const medicalIndicationsRouter = Router();
const sociodemographicDetailsRouter = Router();
const backgroundsRouter = Router();
const alarmRouter = Router();
const preConsultationRouter = Router();
const onbordingRouter = Router();
const getAllNotificationsPatienRouter = Router();
const getAllNotificationsPhysicianRouter = Router();
const notificationsRouter = Router();
const doctorScheduleRouter = Router();
const interconsultationRouter = Router();
const interconsultationDetailsRouter = Router();
const medicalHistoryRouter = Router();
const selfEvaluationEventRouter = Router();
const comorbiditiesRouter = Router();
const treatingPhysicianRouter = Router();
const profileRouter = Router();
const adminRouter = Router();

//* User
userRouter.route("/register-user").post(userRegisterController);
userRouter.route("/validate-email").post(otpMailValidationController);
userRouter.route("/login").post(userLoginController);
userRouter.route("/login-record").get(getAllLoginRecordController);
userRouter.route("/recover-password").post(recoverPasswordController);
userRouter.route("/modify-password").post(modifyPasswordWithOtpController);
userRouter.route("/getAllUsers").get(getAllUsersController);
userRouter.route("/:id").get(getUserController);
userRouter.route("/update-user-info").patch(updateUserInformationController);

//* Profile
profileRouter
  .route("/")
  .get(getUserProfileInfoController)
  .patch(patchUserProfileController);
//* Patient
// patientRouter.route("/patient").post(postPatientController);

patientRouter
  .route("/patient/:id")
  .get(getPatientController)
  .delete(deletePatientController);

patientRouter.route("/patch-patient").patch(patchPatientController);

patientRouter
  .route("/patient-physical-examination")
  .post(createPatientPhysicalExaminationController)
  .patch(updatePatientPhysicalExaminationController)
  .get(getPatientPhysicianExamCtrl);

patientRouter.route("/update-full-patient").patch(updateFullPatientController);
patientRouter
  .route("/patient-medical-request")
  .post(createPatientMedReqCtrl)
  .get(getPatientMedReqCtrl)
  .patch(updatePatientMedReqCtrl)
  .delete(deletePatientMedReqCtrl);

//*Patient studies
patientRouter
  .route("/patient-studies")
  .get(getFilesController)
  .post(postPatientStudiesController)
  .patch(patchPatientStudiesController)
  .delete(deletePatientStudiesController);

//* cardiovascular risk
patientRouter
  .route("/cardiovascular-risk")
  .post(findOrCreateCardiovascularRiskController);

//* Surgical risk
patientRouter.route("/surgical-risk").post(findOrCreateSurgicalRiskController);

//* heart failure classification
patientRouter
  .route("/patient-new-nyha-classification")
  .post(createHeartFailureClassificationController);
patientRouter
  .route("/patient-update-nyha-classification")
  .patch(updateHeartFailureClassificationController);

//* hp risk classification
patientRouter.route("/hp-risk").post(createPulmonaryHypertensionRiskController);

//* pulmonary hypertension group
patientRouter
  .route("/patient-new-hp-group")
  .post(createPatientHpGroupController);
patientRouter
  .route("/patient-update-hp-group")
  .patch(updatePatientHpGroupController);

//*pain map (mapa del dolor)
patientRouter
  .route("/patient-new-pain-map")
  .post(createPatientPainMapController);
patientRouter
  .route("/patient-update-pain-map")
  .patch(patchPatientPainMapController);

patientRouter
  .route("/patient-review/:patientId")
  .post(createPatientReviewController)
  .get(getAllReviewsForPatientController);

patientRouter
  .route("/patients-review-made-for-physician/:physicianId")
  .get(getAllReviewsMadeByPhysicianController);

patientRouter
  .route("/edit-patient-review/:id")
  .patch(patchPatientReviewController);

// patientRouter.patch("/update-full-patient", updateFullPatientController);

//*Patients
getPatientsRouter.get("/patients", getPatientsController);
getPatientsFilterRouter.get("/patientsfilter", getPatientsFilterController);

//*physician
physicianRouter.get("/all-physicians", getAllPhysiciansController);
physicianRouter.get(
  "/find-physician-like-name",
  getPhysicianByNameLikeController
);
physicianRouter.get(
  "/find-physicians-by-specialty-id",
  getPhysiciansBySpecialtyIdController
);
physicianRouter.post(
  "/create-physician-medical-registry",
  createPhysicianMedicalRegisterController
);
physicianRouter.patch(
  "/update-physician-medical-registry",
  updatePhysicianMedicalRegistryController
);
physicianRouter.patch("/update-full-physician", updatePhysicianController);
physicianRouter.post(
  "/create-physician-attendance-place",
  createPhysicianAttendancePlaceController
);
physicianRouter.patch(
  "/update-physician-attendance-place",
  updatePhysicianAttendancePlaceController
);

physicianRouter.post(
  "/create-physician-specialty",
  createPhysicianSpecialtyController
);
physicianRouter.patch(
  "/update-physician-specialty",
  updatePhysicianSpecialtyController
);

physicianRouter.post(
  "/create-physician-favorite-patient",
  createPhysicianFavoritePatientController
); //agrega un paciente favorito un medico
physicianRouter.delete(
  "/delete-physician-favorite-patient",
  deletePhysicianFavoritePatientController
); //agrega un paciente favorito un medico
physicianRouter.get(
  "/get-physician-favorite-patient",
  getPhysicianFavoritePatientController
); //muestra los pacientes favoritos de un medico

// physicianRouter.post("/create-physician-expertise-level",createPhysicianExpertiseLevelController)

physicianRouter
  .route("/physician-review/:physicianId")
  .post(createPhysicianReviewController)
  .get(getAllReviewsForPhisicianController);

physicianRouter
  .route("/physicians-review-made-by-patient/:patientId")
  .get(getAllReviewsMadeByPatientController);

physicianRouter
  .route("/edit-physician-review/:id")
  .patch(patchPhysicianReviewController);

physicianRouter
  .route("/physician-order")
  .post(createNewOrderPhysicianCtrl)
  .get(getPhysicianOrderById);

physicianRouter
  .route("/physician/files")
  .get(getPhysicianFilesController)
  .patch(patchPhysicianFilesController)
  .delete(deletePhysicianFileController);

physicianRouter.route("/physician/token").post(tokenController);

//* Catalogs
catalogsRouter.get("/catalog/get-catalog", getCatalogController);

//* Scheduling
schedulingRouter
  .route("/schedules")
  .post(createSchedulingController)
  .get(getAllSchedulesController)
  .patch(updateStatusSchedulingCtrl);

schedulingRouter
  .route("/schedule/:id")
  .patch(patchScheduleController)
  .delete(deleteSchedulingController);
schedulingRouter
  .route("/schedulesByUserId")
  .get(getAllSchedulesByUserController);

//* Medical Event
medicalEventRouter
  .route("/general-consultation")
  .get(getGeneralConsultationController)
  .post(postGeneralConsultationTabController);
medicalEventRouter
  .route("/consultation")
  .get(getConsultationTabController)
  .post(postConsultationTabController);
medicalEventRouter
  .route("/preconsultation")
  .get(getPreConsultationTabController);
medicalEventRouter.route("/studies").get(getStudiesConsultationTabController);
medicalEventRouter
  .route("/background")
  .get(getBackgroundTabController)
  .post(postBackgroundTabController);
medicalEventRouter.route("/update-event").patch(updateMedicalEventController);
medicalEventRouter
  .route("/last-consultation")
  .get(getLastMedicalEventController);
medicalEventRouter.route("/history").get(getMedicalHistoryController);

//* Vital Signs
vitalSignsRouter.route("/").patch(createVitalSignsController);
vitalSignsRouter.route("/glycemia").post(postGlycemiaRecordsController);
vitalSignsRouter
  .route("/medical-event")
  .get(getVitalSignsByMedicalEventController);

//* Sociodemographic Details
sociodemographicDetailsRouter
  .route("/create-sociodemographic-detail")
  .post(createSociodemographicDetailsController);
sociodemographicDetailsRouter
  .route("/update-sociodemographic-detail")
  .patch(updateSociodemographicDetailsController);
sociodemographicDetailsRouter
  .route("/health-care-search")
  .get(searchHealthCarePlanController);
//*Backgrounds
backgroundsRouter.route("/background").post(createBackgroundsController);

//* Drug Prescription
drugPrescriptionRouter
  .route("/drug-prescription")
  .get(getDrugPrescriptionController)
  .post(createDrugPrescriptionController)
  .patch(updateDrugPrescriptionController)
  .delete(deleteDrugPrescriptionController);
drugPrescriptionRouter
  .route("/drug-prescription/search")
  .get(searchDrugsController);

//* medical Procedure Prescription
procedurePrescriptionRouter
  .route("/procedure/create-procedure-prescription")
  .post(createMedicalProcedurePrescriptionController);
procedurePrescriptionRouter
  .route("/procedure/update-procedure-prescription")
  .patch(updateMedicalProcedurePrescriptionController);

//* Medical Referral
medicalReferralRouter
  .route("/referral/create-medical-referral")
  .post(createMedicalReferralController);
medicalReferralRouter
  .route("/referral/update-medical-referral")
  .patch(updateMedicalReferralController);
//* Medical CIE10 Register
medicalReferralRouter
  .route("/cie10")
  .post(createRegisterCie10Ctrl)
  .get(searchCIEController)
  .get(getCatAndSubCatCtrl);
// *Medical Indications
medicalIndicationsRouter
  .route("/medical-indications/new-indication")
  .post(createMedicalIndicationsController);

//* Alarm
alarmRouter.route("/alarm").post(createAlarmEventController);

alarmRouter.route("/alarms-by-patient/").get(getAllAlarmsForPatientController);

alarmRouter
  .route("/alarms-by-patient/:patientId")
  .get(getAllAlarmsForPatientController);

alarmRouter.route("/edit-alarm-event/:id").patch(patchAlarmEventController);

//*Provisional Pre Consultation
preConsultationRouter
  .route("/get-all-pateint-preconsultation")
  .get(getAllProvisionaPreConsultationPatientController);
preConsultationRouter
  .route("/get-preconsultation")
  .get(getPreConsultationByScheduleIdController);
preConsultationRouter
  .route("/pre-consultation")
  .patch(patchProvisionalPreConsultationController);

//* Statistical center

statisticsRouter.get("/statistics-genre", getGenderDistributionController);
statisticsRouter.get(
  "/statistics-patient-activity",
  getPatientActivityDistributionController
);

//* Doctor schedule
doctorScheduleRouter
  .route("/doctorSchedule")
  .get(getSchedules)
  .post(createSchedule)
  .patch(updateSchedule)
  .delete(deleteSchedule);

statisticsRouter.get(
  "/deprecatedstatistics-genre",
  getGenderDistributionController
);
statisticsRouter.get(
  "/deprecatedstatistics-patient-activity",
  getPatientActivityDistributionController
);
statisticsRouter.get("/statistics-general", getGeneralStatisticsController);

//* INTERCONSULTAS
interconsultationDetailsRouter
  .route("/interconsultation/:id")
  .get(getMedicalInterconsultationDetailsController);

interconsultationRouter.get(
  "/interconsultations",
  getMedicalInterconsultationController
);
interconsultationRouter.patch(
  "/interconsultations",
  createOrUpdateMedicalInterconsultation
);

//* Onboarding
onbordingRouter.patch("/onboarding", createOnboardingController);

//* Notifications
getAllNotificationsPatienRouter.get(
  "/all-notifications-patient",
  getAllNotificationsPatienController
);
getAllNotificationsPhysicianRouter.get(
  "/all-notifications-physician",
  getAllNotificationsPhysicianController
);
notificationsRouter.patch("/notification-seen", patchNotificationsController);

//* Medical History
medicalHistoryRouter.get("/consultation", getConsultationController);
medicalHistoryRouter.get("/patient-detail", getNewPatientDetailsController);
medicalHistoryRouter.get("/vital-signs", getVitalSignsController);
medicalHistoryRouter.get(
  "/evolution",
  getMedicalEventHistoryEvolutionController
);
medicalHistoryRouter.get("/anamnesis", getAnamnesisCtrl);
medicalHistoryRouter.get("/physical-examination", getPatientPhysicianExamCtrl);
medicalHistoryRouter.get("/diagnostics", getDiagnosticController);

//* Self Evaluation
selfEvaluationEventRouter
  .route("/pain-map")
  .get(getPainMapController)
  .post(physicalSelfEvaluationController);
selfEvaluationEventRouter
  .route("/vital-signs")
  .post(createSelfEvaluationVitalSignController);

//* Comorbidities
comorbiditiesRouter.route("/comorbidities").get(searchComorbiditiesController);

//* Treating Physician Request
treatingPhysicianRouter
  .route("/request")
  .get(getRequestController)
  .post(createRequestController)
  .patch(updateTreatingPhysicianController)
  .delete(deleteRequestController);

//* Admin Routes
adminRouter.route("/physician-verification").post(verificationDataPhysicians);

export {
  getPatientsRouter,
  patientRouter,
  physicianRouter,
  getPatientsFilterRouter,
  userRouter,
  catalogsRouter,
  schedulingRouter,
  medicalEventRouter,
  vitalSignsRouter,
  medicalBackgroundsRouter,
  statisticsRouter,
  drugPrescriptionRouter,
  procedurePrescriptionRouter,
  medicalReferralRouter,
  medicalIndicationsRouter,
  sociodemographicDetailsRouter,
  alarmRouter,
  preConsultationRouter,
  backgroundsRouter,
  doctorScheduleRouter,
  onbordingRouter,
  getAllNotificationsPatienRouter,
  getAllNotificationsPhysicianRouter,
  notificationsRouter,
  interconsultationRouter,
  interconsultationDetailsRouter,
  medicalHistoryRouter,
  selfEvaluationEventRouter,
  comorbiditiesRouter,
  treatingPhysicianRouter,
  profileRouter,
  adminRouter,
};
