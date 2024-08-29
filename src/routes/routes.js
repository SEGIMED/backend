import { Router } from "express";
import getPatientsController from "../controllers/patient/getPatientsController.js";
import getPatientsFilterController from "../controllers/patient/getPatientsFilterController.js";
import getPatientController from "../controllers/patient/getPatientController.js";
// import postPatientController from "../controllers/patient/postPatientController.js";
import patchPatientController from "../controllers/patient/patchPatientController.js";
import deletePatientController from "../controllers/patient/deletePatientController.js";
import getPhysicianInformationController from "../controllers/physician/getPhysicianInformationController.js";
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
import postUserContactController from "../controllers/requestPatientContact/postUserContactController.js";
import getAllUserContactController from "../controllers/requestPatientContact/getAllUserContactController.js";
import getCatalogController from "../controllers/catalog/getCatalogController.js";
import createSchedulingController from "../controllers/scheduling/createSchedulingController.js";
import createMedicalEventController from "../controllers/medicalEvent/createMedicalEventController.js";
import getPatientDetailsController from "../controllers/patient/getPatientDetailsController.js";
import getAllUsersController from "../controllers/user/getAllUsersController.js";
import patchResolveUserContactController from "../controllers/requestPatientContact/patchResolveUserContactController.js";
import getUserContactController from "../controllers/requestPatientContact/getUserContactController.js";
import getAllSchedulesController from "../controllers/scheduling/getAllSchedulesController.js";
import createVitalSignsController from "../controllers/vitalSigns/createVitalSignsController.js";
import createAnthropometricDetailController from "../controllers/anthropometricDetails/createAnthropometricDetailController.js";
import createMedicalBackgroundsController from "../controllers/medicalBackgrounds/medicalBackgroundsController.js";
import patchScheduleController from "../controllers/scheduling/patchScheduleController.js";
import deleteSchedulingController from "../controllers/scheduling/deleteSchedulingController.js";
import createPhysicianReviewController from "../controllers/physician/reviewPhysician/createPhysicianReviewController.js";
import getAllReviewsForPhisicianController from "../controllers/physician/reviewPhysician/getAllReviewsForPhysicianController.js";
import getAllReviewsMadeByPatientController from "../controllers/physician/reviewPhysician/getAllReviewsMadeByPatientController.js";
import patchPhysicianReviewController from "../controllers/physician/reviewPhysician/patchPhysicianReviewController.js";
import createDiagnosticTestController from "../controllers/diagnosticTest/createDiagnosticTestController.js";
import createPatientDiagnosticController from "../controllers/patient/createPatientDiagnosticController.js";
import patchDiagnosticTestController from "../controllers/diagnosticTest/patchDiagnosticTestController.js";
import getGenderDistributionController from "../controllers/statisticalCenter/getGenderDistributionController.js";
import getPatientActivityDistributionController from "../controllers/statisticalCenter/getPatientActivityDistributionController.js";
import getGeneralStatisticsController from "../controllers/statisticalCenter/getGeneralStatisticsController.js";
import createDrugPrescriptionController from "../controllers/drugPrescription/createDrugPrescriptionController.js";
import createMedicalProcedurePrescriptionController from "../controllers/medicalProcedurePrescription/createMedicalProcedurePrescriptionController.js";
import createMedicalReferralController from "../controllers/medicalReferral/createMedicalReferralController.js";
import createTherapyPrescriptionController from "../controllers/therapy/createTherapyPrescriptionController.js";
import createPatientPhysicalExaminationController from "../controllers/patient/patientPhysicianExamCtrls/createPatientPhysicalExaminationController.js";
import updatePatientPhysicalExaminationController from "../controllers/patient/patientPhysicianExamCtrls/updatePatientPhysicalExaminationController.js";
import getPatientPhysicianExamCtrl from "../controllers/patient/patientPhysicianExamCtrls/getPatientPhysicianExamCtrl.js";
import updateVitalSignsController from "../controllers/vitalSigns/updateVitalSignsController.js";
import updateTherapyPrescriptionController from "../controllers/therapy/updateTherapyPrescriptionController.js";
import updateMedicalReferralController from "../controllers/medicalReferral/updateMedicalReferralController.js";
import updateMedicalProcedurePrescriptionController from "../controllers/medicalProcedurePrescription/updateMedicalProcedurePrescriptionController.js";
import updateDrugPrescriptionController from "../controllers/drugPrescription/updateDrugPrescriptionController.js";
import updatePatientDiagnosticController from "../controllers/patient/updatePatientDiagnosticController.js";
import updateMedicalBackgroundsController from "../controllers/medicalBackgrounds/updateMedicalBackgroundsController.js";
import updateAnthropometricDetailController from "../controllers/anthropometricDetails/updateAnthropometricDetailsController.js";
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
import createCardiovascularRiskController from "../controllers/patient/patientRisk/createCardiovascularRiskController.js";
import createHeartFailureClassificationController from "../controllers/patient/patientRisk/createHeartFailureClassificationController.js";
import createPulmonaryHypertensionRiskController from "../controllers/patient/patientRisk/createPulmonaryHypertensionRiskController.js";
import createPatientPainMapController from "../controllers/painMap/createPatientPainMapController.js";
import updatePhysicianController from "../controllers/physician/updateFullPhysician.js";
import updateMedicalEventController from "../controllers/medicalEvent/updateMedicalEventController.js";
import createSociodemographicDetailsController from "../controllers/sociodemographicDetails/createSociodemographicDetailsController.js";
import updateSociodemographicDetailsController from "../controllers/sociodemographicDetails/updateSociodemographicDetailsController.js";
import createSurgicalRiskController from "../controllers/patient/patientRisk/createSurgicalRiskController.js";
import createPatientHpGroupController from "../controllers/patient/createPatientHpGroupController.js";
import updatePatientHpGroupController from "../controllers/patient/updatePatientHpGroupController.js";
import updateSurgicalRiskController from "../controllers/patient/patientRisk/updateSurgicalRiskController.js";
import updateHpRiskController from "../controllers/patient/patientRisk/updatePulmonaryHypertensionRiskController.js";
import updateHeartFailureClassificationController from "../controllers/patient/patientRisk/updateHeartFailureClassificationController.js";
import updateCardiovascularRiskController from "../controllers/patient/patientRisk/updateCardiovascularRiskController.js";
import updateFullPatientController from "../controllers/patient/updateFullPatientController.js";
import getMedicalEventHistoryController from "../controllers/medicalEvent/getMedicalEventHistoryController.js";
import getMedicalEventHistoryEvolutionController from "../controllers/medicalHistory/getMedicalEventHistoryEvolution.js";
import getMedicalEventDetailController from "../controllers/medicalEvent/getMedicalEventDetailController.js";
import createBackgroundsController from "../controllers/backgrounds/createBackgroundsController.js";
import updateBackgroundsController from "../controllers/backgrounds/updatebackgroundsController.js";
import createAlarmEventController from "../controllers/alarmEvent/createAlarmEventController.js";
import getAllAlarmsForPatientController from "../controllers/alarmEvent/getAllAlarmsForPatientController.js";
import patchAlarmEventController from "../controllers/alarmEvent/patchAlarmEventController.js";
import createPreConsultationController from "../controllers/patient/preConsultation/ProvisionalPreConsultationController.js";
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
import { getRequestController } from "../controllers/requestFollow/getReqFollowController.js";
import { createRequestController } from "../controllers/requestFollow/createReqFollowCtrl.js";
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

const patientRouter = Router();
const userRouter = Router();
const getPatientsRouter = Router();
const physicianRouter = Router();
const getPatientsFilterRouter = Router();
const requestUserContactRouter = Router();
const catalogsRouter = Router();
const schedulingRouter = Router();
const medicalEventRouter = Router();
const vitalSignsRouter = Router();
const anthropometricDetailsRouter = Router();
const medicalBackgroundsRouter = Router();
const diagnosticTestRouter = Router();
const statisticsRouter = Router();
const drugPrescriptionRouter = Router();
const procedurePrescriptionRouter = Router();
const medicalReferralRouter = Router();
const therapyPrescriptionRouter = Router();
const medicalIndicationsRouter = Router();
const sociodemographicDetailsRouter = Router();
const backgroundsRouter = Router();
const alarmRouter = Router();
const preConsultationRouter = Router();
const requestFollowRouter = Router();
const onbordingRouter = Router();
const getAllNotificationsPatienRouter = Router();
const getAllNotificationsPhysicianRouter = Router();
const notificationsRouter = Router();
const doctorScheduleRouter = Router();
const interconsultationRouter = Router();
const interconsultationDetailsRouter = Router();
const medicalHistoryRouter = Router();
const selfEvaluationEventRouter = Router();

//* User
userRouter.route("/user/register-user").post(userRegisterController);
userRouter.route("/user/validate-email").post(otpMailValidationController);
userRouter.route("/user/login").post(userLoginController);
userRouter.route("/user/login-record").get(getAllLoginRecordController);
userRouter.route("/user/recover-password").post(recoverPasswordController);
userRouter.route("/user/modify-password").post(modifyPasswordWithOtpController);
userRouter.route("/user/getAllUsers").get(getAllUsersController);
userRouter.route("/user/:id").get(getUserController);
userRouter
  .route("/user/update-user-info")
  .patch(updateUserInformationController);

//* Patient
// patientRouter.route("/patient").post(postPatientController);

patientRouter
  .route("/patient/:id")
  .get(getPatientController)
  .delete(deletePatientController);

patientRouter.route("/patch-patient").patch(patchPatientController);

patientRouter.route("/patient-details").get(getPatientDetailsController);

patientRouter
  .route("/patient-diagnostic")
  .post(createPatientDiagnosticController);
patientRouter
  .route("/patient-update-diagnostic")
  .patch(updatePatientDiagnosticController);
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
  .post(postPatientStudiesController);

//* cardiovascular risk
patientRouter
  .route("/patient-new-cardiovascular-risk")
  .post(createCardiovascularRiskController);
patientRouter
  .route("/patient-update-cardiovascular-risk")
  .patch(updateCardiovascularRiskController);

//* Surgical risk
patientRouter
  .route("/patient-new-surgical-risk")
  .post(createSurgicalRiskController);
patientRouter
  .route("/patient-update-surgical-risk")
  .patch(updateSurgicalRiskController);

//* heart failure classification
patientRouter
  .route("/patient-new-nyha-classification")
  .post(createHeartFailureClassificationController);
patientRouter
  .route("/patient-update-nyha-classification")
  .patch(updateHeartFailureClassificationController);

//* hp risk classification
patientRouter
  .route("/patient-new-hp-risk")
  .post(createPulmonaryHypertensionRiskController);
patientRouter.route("/patient-update-hp-risk").patch(updateHpRiskController);

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
physicianRouter.get("/physician-info", getPhysicianInformationController);
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

//* Catalogs
catalogsRouter.get("/catalog/get-catalog", getCatalogController);

//* User contact request
requestUserContactRouter
  .route("/requestUserContact")
  .post(postUserContactController)
  .get(getAllUserContactController);
requestUserContactRouter
  .route("/requestUserContact/:id")
  .patch(patchResolveUserContactController)
  .get(getUserContactController);

//* Scheduling
schedulingRouter
  .route("/schedules")
  .post(createSchedulingController)
  .get(getAllSchedulesController);

schedulingRouter
  .route("/schedule/:id")
  .patch(patchScheduleController)
  .delete(deleteSchedulingController);
schedulingRouter
  .route("/schedulesByUserId")
  .get(getAllSchedulesByUserController);

//* Medical Event
medicalEventRouter
  .route("/medical-event/create-event")
  .post(createMedicalEventController);
medicalEventRouter
  .route("/medical-event/update-event")
  .patch(updateMedicalEventController);
medicalEventRouter
  .route("/medical-event/get-medical-event-history")
  .get(getMedicalEventHistoryController);
medicalEventRouter.route("/medical-event/get-medical-event-history-evolution");
medicalEventRouter
  .route("/medical-event/get-medical-event-detail")
  .get(getMedicalEventDetailController);

//* Vital Signs
vitalSignsRouter
  .route("/vital-signs/create-vital-sign")
  .post(createVitalSignsController);
vitalSignsRouter
  .route("/vital-signs/update-vital-sign")
  .patch(updateVitalSignsController);

//* Anthropometric Details
anthropometricDetailsRouter
  .route("/anthropometric-details/create-anthropometric-detail")
  .post(createAnthropometricDetailController);
anthropometricDetailsRouter
  .route("/anthropometric-details/update-anthropometric-detail")
  .patch(updateAnthropometricDetailController);

//* Sociodemographic Details
sociodemographicDetailsRouter
  .route("/sociodemographic-details/create-sociodemographic-detail")
  .post(createSociodemographicDetailsController);
sociodemographicDetailsRouter
  .route("/sociodemographic-details/update-sociodemographic-detail")
  .patch(updateSociodemographicDetailsController);

//* Medical Backgrounds
medicalBackgroundsRouter
  .route("/medical-backgrounds/create-medical-background")
  .post(createMedicalBackgroundsController);
medicalBackgroundsRouter
  .route("/medical-backgrounds/update-medical-background")
  .patch(updateMedicalBackgroundsController);

//*Backgrounds
backgroundsRouter
  .route("/backgrounds/create-backgrounds")
  .post(createBackgroundsController);
backgroundsRouter
  .route("/backgrounds/update-backgrounds")
  .patch(updateBackgroundsController);

//* Diagnostic test
diagnosticTestRouter
  .route("/diagnostic-test/create-diagnostic-test")
  .post(createDiagnosticTestController);
diagnosticTestRouter
  .route("/diagnostic-test/update-diagnostic-test")
  .patch(patchDiagnosticTestController);

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

//* Therapy Prescription
therapyPrescriptionRouter
  .route("/therapy/create-therapy-prescription")
  .post(createTherapyPrescriptionController);
therapyPrescriptionRouter
  .route("/therapy/update-therapy-prescription")
  .patch(updateTherapyPrescriptionController);

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
  .route("/pre-consultation")
  .post(createPreConsultationController);
preConsultationRouter
  .route("/get-all-pateint-preconsultation")
  .get(getAllProvisionaPreConsultationPatientController);
preConsultationRouter
  .route("/get-preconsultation")
  .get(getPreConsultationByScheduleIdController);
preConsultationRouter
  .route("/update-pre-consultation")
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

requestFollowRouter
  .route("/requestFollow")
  .get(getRequestController)
  .post(createRequestController);

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
medicalHistoryRouter.get(
  "/evolution",
  getMedicalEventHistoryEvolutionController
);
medicalHistoryRouter.get("/anamnesis", getAnamnesisCtrl);

//* Self Evaluation
selfEvaluationEventRouter
  .route("/pain-map")
  .get(getPainMapController)
  .post(physicalSelfEvaluationController);

export {
  getPatientsRouter,
  patientRouter,
  physicianRouter,
  getPatientsFilterRouter,
  userRouter,
  catalogsRouter,
  requestUserContactRouter,
  schedulingRouter,
  medicalEventRouter,
  vitalSignsRouter,
  anthropometricDetailsRouter,
  medicalBackgroundsRouter,
  diagnosticTestRouter,
  statisticsRouter,
  drugPrescriptionRouter,
  procedurePrescriptionRouter,
  medicalReferralRouter,
  therapyPrescriptionRouter,
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
};
