import { mapPainMap } from "../painMap/painMapMapper.js";
import { mapPhysicalExamination } from "../patient/physicalExaminationMapper.js";
import { mapPatientDiagnostic } from "../patient/patientDiagnosticMapper.js";
import { mapDrugPrescription } from "../patient/drugPrescriptionMapper.js";
import { mapProcedurePrescription } from "../patient/procedurePrescriptionMapper.js";
import { mapAnthropometricDetail } from "../patient/anthropometricDetailsMapper.js";
import { mapVitalSign } from "../patient/vitalSignsMapper.js";

export const mapMedicalEventEvolution = (medicalEvent) => {
  return {
    timestamp: medicalEvent.appSch?.scheduledStartTimestamp, //
    chiefComplaint: medicalEvent.appSch?.reasonForConsultation,
    physician: {
      id: medicalEvent.appSch?.physicianThatAttend?.id,
      name: medicalEvent.appSch?.physicianThatAttend?.name,
      lastname: medicalEvent.appSch?.physicianThatAttend?.lastname,
    },
    attendancePlace: {
      id: medicalEvent?.appSch?.attendancePlace?.id,
      alias: medicalEvent?.appSch?.attendancePlace?.alias,
    },
    physicianComments: medicalEvent?.medicalOpinion || "",
    historyOfPresentIllness: medicalEvent?.historyOfPresentIllness,
  };
};

export const mapMedicalEvent = (medicalEvent) => {

  const painMapArray = (medicalEvent?.patientPainMap ? mapPainMap(medicalEvent?.patientPainMap) : {})

  return {
    medicalEventId: medicalEvent.id,
    timestamp: medicalEvent.appSch.scheduledStartTimestamp,

    //motivo de consulta
    chiefComplaint: medicalEvent.appSch.reasonForConsultation,
    status: medicalEvent.appSch.schedulingStatus,
    
    // grupo HTP hipertensión pulmonar
    patientHpGroups: medicalEvent.appSch?.patientUser?.userHpGroups?.map((hpGroup) => {      return {
          group: hpGroup?.catHpGroup?.name ?? null,
          timestamp: hpGroup?.timestamp ?? null,
        };
      }) ?? [],
    
    /// especialidad médica
    medicalSpecialty: medicalEvent.appSch.specialty.name,
    patient: {
      id: medicalEvent.appSch.patientUser.id,
      name: medicalEvent.appSch.patientUser.name,
      lastname: medicalEvent.appSch.patientUser.lastname,
    },
    physician: {
      id: medicalEvent.appSch.physicianThatAttend.id,
      name: medicalEvent.appSch.physicianThatAttend.name,
      lastname: medicalEvent.appSch.physicianThatAttend.lastname,
      avatar: medicalEvent.appSch.physicianThatAttend.avatar,
    },
    // Sitio de atención
    attendancePlace: medicalEvent.appSch.attendancePlace
      ? {
          googleMapsLink: medicalEvent.appSch.attendancePlace.googleMapsLink,
          addressDetails: medicalEvent.appSch.attendancePlace.addressDetails,
          alias: medicalEvent.appSch.attendancePlace.alias,
        }
      : null,

    //Evoluciones
    physicianComments: medicalEvent.physicianComments,

    //ANAMNESIS
    // 1. Motivo de consulta mapeado en la linea 8
    historyOfPresentIllness: medicalEvent.historyOfPresentIllness, // 2. enfermedad actual
    reviewOfSystems: medicalEvent.reviewOfSystems, // 3.sintomas o revision por sistemas

    //detalles antropometricos
    anthropometricDetails: medicalEvent.appSch.patientUser.patientAnthDet.map(
      (anthDetail) => mapAnthropometricDetail(anthDetail)
    ),
    //signos vitales
    vitalSigns: medicalEvent.vitalSignDetailsMedicalEvent
      .concat(medicalEvent.appSch.vitalSignDetailsScheduling)
      .map((vitalSign) => mapVitalSign(vitalSign)),

    ///AUTOEVALUACIONES - mapa del dolor
    painMap: painMapArray,

    //EXAMEN FÍSICO
    physicalExaminations: medicalEvent.patientPhysicalExaminations.map(
      (physicalExam) => mapPhysicalExamination(physicalExam)
    ),

    // // examenes pendientes
    // pendingDiagnosticTest: medicalEvent.pendingDiagnosticTest,

    ///DIAGNÓSTICOS Y TRATAMIENTOS
    //Diagnósticos
    diagnostics: medicalEvent.patientDiagnostics.map((diagnostic) =>
      mapPatientDiagnostic(diagnostic)
    ),

    // Medicamentos recetados
    drugPrescriptions: medicalEvent.drugPrescriptions.map((drugPrescription) =>
      mapDrugPrescription(drugPrescription)
    ),

    // Examenes de laboratorio prescritos
    // prescribedDiagnosticTests: medicalEvent

    // Procedimientos recetados
    medicalProcedures: medicalEvent.procedurePrescriptions.map(
      (procedurePrescription) => mapProcedurePrescription(procedurePrescription)
    ),

    //plan de tratamiento
    treatmentPlan: medicalEvent.pendingDiagnosticTest,

    //Tratamiento no faqrmacológico
    medicalIndications: medicalEvent.medicalIndications.map(
      (medicalIndication) => {
        return {
          description: medicalIndication.description,
          timestamp: medicalIndication.timestamp,
        };
      }
    ),

    //Pauta de alarma
    alarmPattern: medicalEvent.alarmPattern,
  };
};
