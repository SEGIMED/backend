
const validateStudiesInput = (body) => {
  if (!Array.isArray(body.studies) || body.studies.length === 0) {
    throw new Error(
      "El campo 'studies' debe ser un array con al menos un objeto."
    );
  }

  body.studies.forEach((studyObject, index) => {
    if (!studyObject.study || typeof studyObject.study !== "string") {
      throw new Error(
        `El campo 'study' en el estudio ${
          index + 1
        } es obligatorio y debe ser una cadena de texto.`
      );
    }

    if (!studyObject.studyType || typeof studyObject.studyType !== "number") {
      throw new Error(
        `El campo 'studyType' en el estudio ${
          index + 1
        } es obligatorio y debe ser un número.`
      );
    }

    if (
      !studyObject.description ||
      typeof studyObject.description !== "string"
    ) {
      throw new Error(
        `El campo 'description' en el estudio ${
          index + 1
        } es obligatorio y debe ser una cadena de texto.`
      );
    }

    if (!studyObject.title || typeof studyObject.title !== "string") {
      throw new Error(
        `El campo 'title' en el estudio ${
          index + 1
        } es obligatorio y debe ser una cadena de texto.`
      );
    }
  });
};

export default validateStudiesInput;
