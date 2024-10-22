export const validationOnbording = (body) => {
  const errors = [];

  if (typeof body.birthDate !== "string") {
    errors.push("La fecha de nacimiento debe ser una cadena.");
  }
  if (typeof body.address !== "string") {
    errors.push("La dirección debe ser una cadena.");
  } else if (body.address.length <= 3 || body.address.length >= 50) {
    errors.push("La dirección debe tener entre 4 y 50 caracteres.");
  }
  if (typeof body.genre !== "number") {
    errors.push("El género debe ser un número.");
  }
  if (typeof body.hipertPulm !== "boolean") {
    errors.push("La hipertensión pulmonar debe ser un valor booleano.");
  }
  if (typeof body.centerAttention !== "number") {
    errors.push("El centro de atención debe ser un número.");
  }
  if (typeof body.liveAlone !== "boolean") {
    errors.push("El valor de vivir solo debe ser booleano.");
  }
  if (typeof body.hasTechUseDifficulty !== "boolean") {
    errors.push(
      "La dificultad para usar tecnología debe ser un valor booleano."
    );
  }
  if (typeof body.needsCellphoneAssistance !== "boolean") {
    errors.push(
      "La necesidad de asistencia con el celular debe ser un valor booleano."
    );
  }

  if (errors.length === 0) {
    return { valid: true };
  }

  return {
    valid: false,
    errors,
  };
};
