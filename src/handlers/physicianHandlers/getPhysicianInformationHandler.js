import {
  AppointmentScheduling,
  CatCity,
  CatCountry,
  CatMedicalRegistrationType,
  CatMedicalSpecialty,
  CatPhysicianExpertiseLevel,
  CatProvince,
  CatRole,
  CatSchedulingStatus,
  MedicalEvent,
  PhysicianAttendancePlace,
  PhysicianDetails,
  PhysicianMedicalRegistry,
  PhysicianSpecialty,
  User,
  UserCurrentLocation,
} from "../../databaseConfig.js";
import { mapPhysician } from "../../mapper/physician/physicianMapper.js";

const getPhysicianInformationHandler = async (id) => {
  //TODO verificaciones para el id. Que si llegue y sea número entero positivo y otras que se ocurran
  try {
    const physicianInformation = await User.findOne({
      where: {
        role: 2,
        id: id,
      },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: CatRole,
          as: "userRole",
          where: {
            roleName: "Médico",
          },
        },
        {
          model: PhysicianSpecialty,
          as: "physicianSpecialties",
          include: {
            model: CatMedicalSpecialty,
            as: "specialty",
          },
        },
        {
          model: UserCurrentLocation,
          as: "currentLocationUser",
        },
        {
          model: CatCountry,
          as: "userNationality",
        },
        {
          model: PhysicianMedicalRegistry,
          as: "physicianMedicalRegistries",
          include: {
            model: CatMedicalRegistrationType,
            as: "medicalRegistrationType",
          },
        },
        {
          model: PhysicianAttendancePlace,
          as: "physicianAttendancePlaces",
        },
        {
          model: PhysicianDetails,
          as: "physicianDetails",
          include: {
            model: CatPhysicianExpertiseLevel,
            as: "physicianExpertiseLevel",
          },
        },
        {
          model: AppointmentScheduling,
          as: "physicianScheduling",
          include: [
            {
              model: CatSchedulingStatus,
              as: "status",
              attributes: ["name"],
            },
            {
              model: MedicalEvent,
              as: "medicalEvent",
            },
            {
              model: User,
              as: "patientUser",
            },
          ],
        },
      ],
    });

    return mapPhysician(physicianInformation);
  } catch (error) {
    throw new Error("Error loading physician: " + error.message);
  }
};

export default getPhysicianInformationHandler;
