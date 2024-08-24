// medicalEventId: medicalEvent.id,
// timestamp: medicalEvent.appSch.scheduledStartTimestamp,
//     //motivo de consulta
//     chiefComplaint: medicalEvent.appSch.reasonForConsultation,
//     status: medicalEvent.appSch.schedulingStatus,
//     physician: {
//       id: medicalEvent.appSch.physicianThatAttend.id,
//       name: medicalEvent.appSch.physicianThatAttend.name,
//       lastname: medicalEvent.appSch.physicianThatAttend.lastname,
//       avatar: medicalEvent.appSch.physicianThatAttend.avatar,
//     },
//     // Sitio de atención
//     attendancePlace: medicalEvent.appSch.attendancePlace
//       ? {
//           googleMapsLink: medicalEvent.appSch.attendancePlace.googleMapsLink,
//           addressDetails: medicalEvent.appSch.attendancePlace.addressDetails,
//           alias: medicalEvent.appSch.attendancePlace.alias,
//         }
//       : null,
//     //Evoluciones
//     physicianComments: medicalEvent.physicianComments,
//     historyOfPresentIllness: medicalEvent.historyOfPresentIllness, // 2. enfermedad actual

import {
  AppointmentScheduling,
  PhysicianAttendancePlace,
  MedicalEvent,
  User,
} from "../../databaseConfig.js";
import { mapMedicalEventEvolution } from "../../mapper/medicalEvent/medicalEventMapper.js";
import interconsultationsMapper from "../../mapper/interconsultation/interconsultationsMapper.js";
import getInterconsultationsByPatientIdHandler from "../medicalEvent/getInterconsultationsByPatientIdHandler.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getMedicalEventHistoryAndInterconsultationHandler = async (
  patientId,
  physicianId,
  page,
  limit
) => {
  try {
    const filters = {
      schedulingStatus: 2, // 2 = atendida
    };

    if (patientId) {
      filters.patient = patientId;
    }
    if (physicianId) {
      filters.physician = physicianId;
    }

    const medicalEventHistory = await MedicalEvent.findAll({
      include: [
        {
          model: AppointmentScheduling,
          as: "appSch",
          where: filters,
          include: [
            {
              model: User,
              as: "patientUser",
            },
            {
              model: User,
              as: "physicianThatAttend",
            },
            {
              model: PhysicianAttendancePlace,
              as: "attendancePlace",
            },
          ],
        },
      ],
    });

    const medicalEvent = medicalEventHistory.map((event) =>
      mapMedicalEventEvolution(event)
    );
    console.log(medicalEvent);
    const interconsultations = await getInterconsultationsByPatientIdHandler(
      patientId
    );
    const interconsultasArray = interconsultationsMapper(interconsultations);
    let result = medicalEvent.concat(interconsultasArray);
    if (page && limit) {
      return universalPaginationHandler(result, page, limit);
    } else {
      return result;
    }
  } catch (error) {
    throw new Error("Error loading physician: " + error.message);
  }
};

export default getMedicalEventHistoryAndInterconsultationHandler;
