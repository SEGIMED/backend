import { mapPainMap } from "../painMap/painMapMapper.js";
import { mapAnthropometricDetail } from "../patient/anthropometricDetailsMapper.js";
import { mapVitalSign } from "../patient/vitalSignsMapper.js";
import { mapPhysicalExamination } from "../patient/physicalExaminationMapper.js";
import { mapDiagnosticTest } from "../patient/diagnosticTestMapper.js";
import { mapPatientDiagnostic } from "../patient/patientDiagnosticMapper.js";
import { mapDrugPrescription } from "../patient/drugPrescriptionMapper.js";
import { mapProcedurePrescription } from "../patient/procedurePrescriptionMapper.js";
import { SociodemographicDetails } from "../../databaseConfig.js";

export const mapMedicalEventDetail = (medicalEvent) => {
  const painMapArray = (medicalEvent?.patientPainMaps ?? [])
    .concat(medicalEvent?.appSch?.patientPainMaps ?? [])
    .map((painMap) => mapPainMap(painMap));

    
  return {
    medicalEventId: medicalEvent?.id ?? null,

    // Datos del paciente
    patient: {
      id: medicalEvent?.appSch?.patientUser?.id ?? null,
      name: medicalEvent?.appSch?.patientUser?.name ?? null,
      lastname: medicalEvent?.appSch?.patientUser?.lastname ?? null,
      cellphone: medicalEvent?.appSch?.patientUser?.cellphone ?? null,
      email: medicalEvent?.appSch?.patientUser?.email ?? null,
      nationality: medicalEvent?.appSch?.patientUser?.nationality ?? null,
      currentLocation:
        medicalEvent?.appSch?.patientUser?.currentLocation ?? null,
      geolocation: medicalEvent?.appSch?.patientUser?.geolocation ?? null,
      genre: medicalEvent?.appSch?.patientUser?.socDemDet?.catGenre ?? null,
    },

    // grupo HTP
    patientHpGroups:
      medicalEvent?.appSch?.patientUser?.userHpGroups?.map((hpGroup) => {
        return {
          group: hpGroup?.catHpGroup?.name ?? null,
          timestamp: hpGroup?.timestamp ?? null,
        };
      }) ?? [],

    // Antecedentes como texto
    backgrounds: (medicalEvent?.appSch?.patientUser?.backgrounds ?? [])
      .concat(medicalEvent?.background ?? [])
      .filter((background) => background !== null),

    //motivo de consulta
    chiefComplaint: medicalEvent?.chiefComplaint ?? null,
    /// enfermedad actual
    historyOfPresentIllness: medicalEvent?.historyOfPresentIllness ?? null,
    // sintomas o revision por sistemas
    reviewOfSystems: medicalEvent?.reviewOfSystems ?? null,

    //detalles antropometricos
    anthropometricDetails:
      medicalEvent?.appSch?.patientUser?.patientAnthDet?.map((anthDetail) =>
        mapAnthropometricDetail(anthDetail)
      ) ?? [],

    //signos vitales
    vitalSigns: (medicalEvent?.vitalSignDetailsMedicalEvent ?? [])
      .concat(medicalEvent?.appSch?.vitalSignDetailsScheduling ?? [])
      .map((vitalSign) => mapVitalSign(vitalSign)),

    /// autoevaluacion
    painMap: painMapArray[0],

    //examen fisico
    physicalExaminations:
      medicalEvent?.patientPhysicalExaminations?.map((physicalExam) =>
        mapPhysicalExamination(physicalExam)
      ) ?? [],

    //Estudios diagnosticos
    diagnosticTests: (medicalEvent?.diagnosticTests ?? [])
      .concat(medicalEvent?.appSch?.schDiagnosticTests ?? [])
      .map((diagnosticTest) => mapDiagnosticTest(diagnosticTest)),

    // examenes pendientes
    pendingDiagnosticTest: medicalEvent?.pendingDiagnosticTest ?? null,

    //evoluciones
    physicianComments: medicalEvent?.physicianComments ?? null,

    //Diagnosticos
    diagnostics:
      medicalEvent?.patientDiagnostics?.map((diagnostic) =>
        mapPatientDiagnostic(diagnostic)
      ) ?? [],

    // Medicamentos recetados
    drugPrescriptions:
      medicalEvent?.drugPrescriptions?.map((drugPrescription) =>
        mapDrugPrescription(drugPrescription)
      ) ?? [],

    // Procedimientos recetados
    medicalProcedures:
      medicalEvent?.procedurePrescriptions?.map((procedurePrescription) =>
        mapProcedurePrescription(procedurePrescription)
      ) ?? [],

    //plan de tratamiento
    treatmentPlan: medicalEvent?.pendingDiagnosticTest ?? null,

    //Tratamiento no farmacológico
    medicalIndications:
      medicalEvent?.medicalIndications?.map((medicalIndication) => {
        return {
          description: medicalIndication?.description ?? null,
          timestamp: medicalIndication?.timestamp ?? null,
        };
      }) ?? [],

    //Pauta de alarma
    alarmPattern: medicalEvent?.alarmPattern ?? null,

    // Añadir los timestamps del scheduling a la respuesta
    timestamp: medicalEvent?.appSch?.scheduledStartTimestamp ?? null,
  };
};
