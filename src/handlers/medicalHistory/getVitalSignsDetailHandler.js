import {
  VitalSignDetails,
  SelfEvaluationEvent,
  CatMeasureUnit,
  CatVitalSignMeasureType,
} from "../../databaseConfig.js";
import { Sequelize, Op } from "sequelize";
import { mapVitalDetailSingsDetail } from "./mapp/mapVitalSingsME.js";

const getVitalSigns = async (eventId) => {
  const vitalSigns = await VitalSignDetails.findAll({
    where: {
      medicalEvent: eventId,
    },
    include: [
      {
        model: CatVitalSignMeasureType,
        as: "vitalSignMeasureType",
        attributes: ["id", "name"],
        include: [
          {
            model: CatMeasureUnit,
            as: "measUnit",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });

  return vitalSigns;
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

const getVitalSignsDetailHandler = async (eventId, isMedicalEvent) => {
  let vitalSigns = {};
  console.log(eventId, isMedicalEvent);
  isMedicalEvent
    ? (vitalSigns = await getVitalSigns(eventId))
    : console.log("no es un medical event");

  //   const selfEvaluationEventsWithVitalSigns = await getSelfEvaluationEventsWithVitalSigns();

  return mapVitalDetailSingsDetail(vitalSigns);
};
export default getVitalSignsDetailHandler;
