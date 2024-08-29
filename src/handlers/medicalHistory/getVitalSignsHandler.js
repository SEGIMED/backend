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
import { mapVitalSingsME, mapVitalSingsSEE } from "./map/mapVitalSingsME.js";
import universalOrderByHandler from "../Pagination/universalOrderByHandler.js";

const getHTPGroup = async (patientId) => {
  const group = await PatientPulmonaryHypertensionGroup.findOne({
    where: {
      patient: patientId,
    },
    include: [
      {
        model: CatPulmonaryHypertensionGroup,
        as: "catHpGroup",
        attributes: ["id", "name", "description"], // Asegúrate de que los atributos sean correctos
      },
    ],
  });

  if (!group) {
    return null;
  }
  const groupData = group.catHpGroup
    ? group.catHpGroup.get({ plain: true })
    : null;
  return groupData;
};

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
      },
    ],
  });
  return medicalEvents;
};

const getSelfEvaluationEventsWithVitalSigns = async (patientId) => {
  const selfEvaluationEvents = await SelfEvaluationEvent.findAll({
    include: [
      {
        model: VitalSignDetails,
        as: "vitalSigns",
        where: { patient: patientId },
        required: true, // Esto asegura que solo se incluyan SelfEvaluationEvents con VitalSignDetails
      },
    ],
  });

  return selfEvaluationEvents;
};

const getVitalSignsHandler = async (patientId, page, limit) => {
  //busco el HTP group
  const groupHTP = await getHTPGroup(patientId);
  //ovtengo los medical event
  const medicalEventsWithVitalSigns = await getMedicalEventsWithVitalSigns(
    patientId
  );
  //mapeo los restutados
  let mapMedicalEvents = await mapVitalSingsME(
    medicalEventsWithVitalSigns,
    groupHTP
  );
  //ovtengo los selfevaluation event
  const selfEvaluationEventsWithVitalSigns =
    await getSelfEvaluationEventsWithVitalSigns(patientId);
  //mapeo los restutados
  let mapSelfEvaluationEvents = await mapVitalSingsSEE(
    selfEvaluationEventsWithVitalSigns,
    groupHTP
  );
  //primero ordenamos y luego paginamos
  let result = await universalOrderByHandler(
    mapMedicalEvents.concat(mapSelfEvaluationEvents)
  );
  result = await universalPaginationHandler(result, page, limit);
  return result;
};
export default getVitalSignsHandler;
