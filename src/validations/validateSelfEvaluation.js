import models from "../databaseConfig.js";

export const validateSelfEvaluation = async (
  painDuration,
  painScale,
  painType,
  painFrequency,
  isTakingAnalgesic,
  doesAnalgesicWorks,
  isWorstPainEver,
  painOwner,
  painAreas
) => {
  const validPainDuration = await models.CatPainDuration.findByPk(painDuration);
  if (!validPainDuration) {
    throw new Error(
      "El valor de 'painDuration' no corresponde a una duración válida."
    );
  }

  const validPainScale = await models.CatPainScale.findByPk(painScale);
  if (!validPainScale) {
    throw new Error(
      "El valor de 'painScale' no corresponde a una escala válida."
    );
  }

  const validPainType = await models.CatPainType.findByPk(painType);
  if (!validPainType) {
    throw new Error(
      "El valor de 'painType' no corresponde a un tipo de dolor válido."
    );
  }

  const validPainFrequency = await models.CatPainFrequency.findByPk(
    painFrequency
  );
  if (!validPainFrequency) {
    throw new Error(
      "El valor de 'painFrequency' no corresponde a una frecuencia válida."
    );
  }

  const validPainOwner = await models.User.findByPk(painOwner);
  if (!validPainOwner) {
    throw new Error(
      "El valor de 'painOwner' no corresponde a un usuario válido."
    );
  }

  if (typeof isTakingAnalgesic !== "boolean") {
    throw new Error("El campo 'isTakingAnalgesic' debe ser de tipo booleano.");
  }

  if (doesAnalgesicWorks && typeof doesAnalgesicWorks !== "boolean") {
    throw new Error("El campo 'doesAnalgesicWorks' debe ser de tipo booleano.");
  }

  if (typeof isWorstPainEver !== "boolean") {
    throw new Error("El campo 'isWorstPainEver' debe ser de tipo booleano.");
  }

  if (painAreas && !Array.isArray(painAreas)) {
    throw new Error("El campo 'painAreas' debe ser un array.");
  }

  if (isTakingAnalgesic && !doesAnalgesicWorks ) {
    throw new Error(
      "El campo 'doesAnalgesicWorks' debe especificarse cuando 'isTakingAnalgesic' es verdadero."
    );
  }

};
