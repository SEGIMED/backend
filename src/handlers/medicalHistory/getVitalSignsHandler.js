import {
  MedicalEvent,
  AppointmentScheduling,
  VitalSignDetails,
  SelfEvaluationEvent,
  User,
  CatCenterAttention,
  PatientPulmonaryHypertensionGroup,
  CatPulmonaryHypertensionGroup,
  SociodemographicDetails,
} from "../../databaseConfig.js";
import { Sequelize, Op } from "sequelize";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";
import { mapVitalSingsME } from "./mapp/mapVitalSingsME.js";

const getMedicalEventsWithVitalSigns = async (patientId) => {
  const medicalEvents = await MedicalEvent.findAll({
    where: {
      "$vitalSignDetailsMedicalEvent.id$": { [Sequelize.Op.ne]: null },
    },
    attributes: ["id", "physicianComments"],
    include: [
      {
        model: AppointmentScheduling,
        as: "appSch",
        attributes: [
          "id",
          "healthCenter",
          "reasonForConsultation",
          "scheduledEndTimestamp",
        ],
        include: [
          {
            model: CatCenterAttention,
            as: "healthCenterDetails", // Usa el alias correcto definido en el modelo
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: VitalSignDetails,
        as: "vitalSignDetailsMedicalEvent",
        required: true,
        attributes: ["id"],
        where: { patient: patientId },
        include: [
          {
            model: User,
            as: "measSourceUser",
            attributes: ["id", "name", "lastname"],
            include: [
              {
                model: PatientPulmonaryHypertensionGroup,
                as: "userHpGroups",
                include: [
                  {
                    model: CatPulmonaryHypertensionGroup,
                    as: "catHpGroup",
                    attributes: ["id", "name", "description"], // Asegúrate de que los atributos sean correctos
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  return medicalEvents;
};

const getSelfEvaluationEventsWithVitalSigns = async () => {
  const selfEvaluationEvents = await SelfEvaluationEvent.findAll({
    include: [
      {
        model: VitalSignDetails,
        required: true, // Esto asegura que solo se incluyan SelfEvaluationEvents con VitalSignDetails
      },
    ],
  });

  return selfEvaluationEvents;
};

const getVitalSignsHandler = async (patientId, page, limit) => {
  const medicalEventsWithVitalSigns = mapVitalSingsME(
    await getMedicalEventsWithVitalSigns(patientId)
  );

  //   const selfEvaluationEventsWithVitalSigns = await getSelfEvaluationEventsWithVitalSigns();

  return universalPaginationHandler(medicalEventsWithVitalSigns, page, limit);
};
export default getVitalSignsHandler;
