import {mapPainMap} from "../painMap/painMapMapper.js";
import {mapAnthropometricDetail} from "../patient/anthropometricDetailsMapper.js";
import {mapVitalSign} from "../patient/vitalSignsMapper.js";
import {mapPhysicalExamination} from "../patient/physicalExaminationMapper.js";
import {mapDiagnosticTest} from "../patient/diagnosticTestMapper.js";
import {mapPatientDiagnostic} from "../patient/patientDiagnosticMapper.js";
import {mapDrugPrescription} from "../patient/drugPrescriptionMapper.js";
import {mapProcedurePrescription} from "../patient/procedurePrescriptionMapper.js";


export const mapMedicalEventDetail = (medicalEvent) => {
    return {
        medicalEventId: medicalEvent.id,

        // Datos del paciente
        patient: {
            id: medicalEvent.appSch.patientUser.id,
            name: medicalEvent.appSch.patientUser.name,
            lastname: medicalEvent.appSch.patientUser.lastname,
            cellphone: medicalEvent.appSch.patientUser.cellphone,
            email: medicalEvent.appSch.patientUser.email,
            nationality: medicalEvent.appSch.patientUser.nationality,
            currentLocation: medicalEvent.appSch.patientUser.currentLocation,
            geolocation: medicalEvent.appSch.patientUser.geolocation,
        },

        // grupo HTP
        patientHpGroups: medicalEvent.appSch.patientUser.userHpGroups.map(hpGroup => {
            return {
                group: hpGroup.catHpGroup.name,
                timestamp: hpGroup.timestamp
            }
        }),

        // Antecedentes como texto
        backgrounds: medicalEvent.appSch.patientUser.backgrounds.concat(medicalEvent.background).filter(background => background !== null),

        //motivo de consulta
        chiefComplaint: medicalEvent.chiefComplaint,
        /// enfermedad actual
        historyOfPresentIllness: medicalEvent.historyOfPresentIllness,
        // sintomas o revision por sistemas
        reviewOfSystems: medicalEvent.reviewOfSystems,

        //detalles antropometricos
        anthropometricDetails : medicalEvent.appSch.patientUser.patientAnthDet.map(anthDetail => mapAnthropometricDetail(anthDetail)),

        //signos vitales
        vitalSigns: medicalEvent.vitalSignDetailsMedicalEvent.concat(medicalEvent.appSch.vitalSignDetailsScheduling).map(vitalSign=> mapVitalSign(vitalSign)),

        ///autoevaluacion
        painMap: medicalEvent.patientPainMaps.concat(medicalEvent.appSch.patientPainMaps).map( painMap => mapPainMap(painMap)),

        //examen fisico
        physicalExaminations: medicalEvent.patientPhysicalExaminations.map(physicalExam => mapPhysicalExamination(physicalExam)),

        //Estudios diagnosticos
        diagnosticTests: medicalEvent.diagnosticTests.concat(medicalEvent.appSch.schDiagnosticTests).map(diagnosticTest => mapDiagnosticTest(diagnosticTest)),

        // examenes pendientes
        pendingDiagnosticTest: medicalEvent.pendingDiagnosticTest,

        //evoluciones
        physicianComments: medicalEvent.physicianComments,

        //Diagnosticos
        diagnostics: medicalEvent.patientDiagnostics.map(diagnostic => mapPatientDiagnostic(diagnostic)),

        // Medicamentos recetados
        drugPrescriptions: medicalEvent.drugPrescriptions.map(drugPrescription => mapDrugPrescription(drugPrescription)),

        // Examenes de laboratorio prescritos
        // prescribedDiagnosticTests: medicalEvent

        // Procedimientos recetados
        medicalProcedures: medicalEvent.procedurePrescriptions.map(procedurePrescription => mapProcedurePrescription(procedurePrescription)),

        //plan de tratamiento
        treatmentPlan: medicalEvent.pendingDiagnosticTest,

        //Tratamiento no faqrmacológico
        medicalIndications: medicalEvent.medicalIndications.map(medicalIndication =>{
            return {
                description: medicalIndication.description,
                timestamp: medicalIndication.timestamp
            }
        }),

        //Pauta de alarma
        alarmPattern: medicalEvent.alarmPattern

    }
}
