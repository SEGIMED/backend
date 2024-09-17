import {
  AppointmentScheduling,
  Backgrounds,
  CatCardiovascularRisk,
  CatCivilStatus,
  CatEducationalLevel,
  CatGenre,
  CatHealthCarePlan,
  CatHeartFailureClassification,
  CatMeasureUnit,
  CatMedicalSpecialty,
  CatRisk,
  CatPulmonaryHypertensionGroup,
  CatSchedulingStatus,
  CatSurgicalRisk,
  CatVitalSignMeasureType,
  PatientCardiovascularRisk,
  PatientHeartFailureClassification,
  PatientPulmonaryHypertensionGroup,
  PatientPulmonaryHypertensionRisk,
  PatientSurgicalRisk,
  SociodemographicDetails,
  User,
  UserCurrentLocation,
  VitalSignDetails,
} from "../../databaseConfig.js";
import segimedAPIError from "../../error/SegimedAPIError.js";
import { mapPatient } from "../../mapper/patient/patientMapper.js";
import catHeartFailureClassification from "../../models/CatHeartFailureClassification.js";
import { Op } from "sequelize";

const getPatientDetailsHandler = async (id) => {
  try {
    const patientDetails = await User.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: UserCurrentLocation,
          as: "currentLocationUser",
        },
        {
          model: PatientPulmonaryHypertensionGroup,
          as: "userHpGroups",
          include: {
            model: CatPulmonaryHypertensionGroup,
            as: "catHpGroup",
            attributes: ["name"],
          },
        },
        {
          model: PatientPulmonaryHypertensionRisk,
          as: "patPHRisks",
          include: {
            model: CatRisk,
            as: "catHpRisk",
            attributes: ["name"],
          },
        },
        {
          model: PatientCardiovascularRisk,
          as: "ptCvRsks",
          include: {
            model: CatCardiovascularRisk,
            as: "catCvRisk",
            attributes: ["name"],
          },
        },
        {
          model: PatientHeartFailureClassification,
          as: "patientHeartFailureClassifications",
          include: {
            model: CatHeartFailureClassification,
            as: "CatHeartFailureClass",
            attributes: ["name"],
          },
        },
        {
          model: PatientSurgicalRisk,
          as: "patSgRisks",
          include: {
            model: CatSurgicalRisk,
            as: "catSurgicalRisk",
            attributes: ["name"],
          },
        },
        {
          model: Backgrounds,
          as: "backgrounds",
          order: [["timestamp", "DESC"]],
          limit: 1,
        },
        {
          model: VitalSignDetails,
          as: "patientVitalSignDetails",
          include: [
            {
              model: CatVitalSignMeasureType,
              as: "vitalSignMeasureType",
              include: {
                model: CatMeasureUnit,
                as: "measUnit",
              },
            },
            {
              model: User,
              as: "measSourceUser",
              attributes: ["name", "lastname"],
            },
          ],
        },
        {
          model: SociodemographicDetails,
          as: "socDemDet",
          include: [
            {
              model: CatGenre,
              as: "catGenre",
              attributes: ["name"],
            },
            {
              model: CatEducationalLevel,
              as: "catEducationalLevel",
              attributes: ["name"],
            },
            {
              model: CatCivilStatus,
              as: "catCivilStatus",
              attributes: ["name"],
            },
            {
              model: CatHealthCarePlan,
              as: "catHealthCarePlan",
              attributes: ["name"],
            },
            {
              model: CatHealthCarePlan,
              as: "catHealthCarePlan",
              attributes: ["name"],
            },
          ],
        },
        {
          model: AppointmentScheduling,
          as: "patientAppScheds",
          separate: true,
          order: [["scheduledStartTimestamp", "DESC"]],
          include: [
            {
              model: User,
              as: "physicianThatAttend",
            },
            {
              model: CatMedicalSpecialty,
              as: "specialty",
            },
            {
              model: CatSchedulingStatus,
              as: "status",
              where: {
                name: "Atendida",
              },
            },
          ],
          limit: 1,
        },
      ],
    });

    return mapPatient(patientDetails);
  } catch (error) {
    console.log(error);
    throw new segimedAPIError(error, 500);
  }
};

export default getPatientDetailsHandler;
