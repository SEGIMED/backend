import {
  VitalSignDetails,
  CatMeasureUnit,
  CatVitalSignMeasureType,
} from "../../databaseConfig.js";
import { mapVitalDetailSingsDetail } from "./map/mapVitalSingsME.js";

const getVitalSignsME = async (eventId) => {
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

const getVitalSignsSEE = async (eventId) => {
  const vitalSigns = await VitalSignDetails.findAll({
    where: {
      selfEvaluationEvent: eventId,
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

const getVitalSignsDetailHandler = async (eventId, isMedicalEvent) => {
  let vitalSigns = {};
  isMedicalEvent === "true"
    ? (vitalSigns = await getVitalSignsME(eventId))
    : (vitalSigns = await getVitalSignsSEE(eventId));
  return mapVitalDetailSingsDetail(vitalSigns);
};
export default getVitalSignsDetailHandler;
