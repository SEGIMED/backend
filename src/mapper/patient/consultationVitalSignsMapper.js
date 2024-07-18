import models from "../../databaseConfig.js";

export const consultationVitalSignsMapper = async (vitalSignDetails) => {
  try {
    const vitalSignsMeasureTypesList =
      await models.CatVitalSignMeasureType.findAll({
        include: [{ model: models.CatMeasureUnit, as: "measUnit" }],
      });

    const vitalSignTypeMapped = vitalSignsMeasureTypesList.map(
      (vitalSignType) => {
        const vitalSignDetail = vitalSignDetails.find(
          (detail) => detail.vitalSignMeasureType.name === vitalSignType.name
        );

        if (vitalSignDetail) {
          return {
            id: vitalSignDetail.id,
            measureType: vitalSignType.name,
            measure: vitalSignDetail.measure,
            measUnit: vitalSignType.measUnit.name,
            measureTimestamp: vitalSignDetail.measureTimestamp,
            measureSource: vitalSignDetail.measureSource,
            scheduling: vitalSignDetail.scheduling,
            medicalEvent: vitalSignDetail.medicalEvent,
          };
        } else {
          return {
            id: null,
            measureType: vitalSignType.name,
            measure: null,
            measUnit: vitalSignType.measUnit.name,
            measureTimestamp: null,
            measureSource: null,
            scheduling: null,
            medicalEvent: null,
          };
        }
      }
    );

    return vitalSignTypeMapped;
  } catch (error) {
    console.log(error);
  }
};
