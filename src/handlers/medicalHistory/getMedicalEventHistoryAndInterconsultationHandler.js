import {
  AppointmentScheduling,
  PhysicianAttendancePlace,
  MedicalEvent,
  User,
} from "../../databaseConfig.js";
import interconsultationsMapper from "../../mapper/interconsultation/interconsultationsMapper.js";
import getInterconsultationsByPatientIdHandler from "../medicalEvent/getInterconsultationsByPatientIdHandler.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";
import universalOrderByHandler from "../Pagination/universalOrderByHandler.js";

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

const getMedicalEventHistoryAndInterconsultationHandler = async ({
  patientId,
  physicianId,
  medicalSpecialtyId,
  page,
  limit,
}) => {
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
    if (medicalSpecialtyId) {
      filters.medicalSpecialty = medicalSpecialtyId;
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
    let result;
    if (!medicalSpecialtyId) {
      const interconsultations = await getInterconsultationsByPatientIdHandler(
        patientId
      );
      const interconsultasArray = interconsultationsMapper(interconsultations);
       result = await universalOrderByHandler(
        medicalEvent.concat(interconsultasArray)
      );
    } else {
      result = medicalEvent
    }
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
