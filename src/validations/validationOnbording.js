export const validationOnbording = (body) => {
  if (typeof body.birthDate !== "string") {
    return "birthDate must be a string";
  }
  if (typeof body.address !== "string") {
    return "address must be a string";
  }
  if (typeof body.genre !== "number") {
    return "genre must be a number";
  }
  if (typeof body.hipertPulm !== "boolean") {
    return "hipertPulm must be a boolean";
  }
  if (typeof body.centerAttention !== "number") {
    return "centerAttention must be a number";
  }
  if (typeof body.liveAlone !== "boolean") {
    return "liveAlone must be a boolean";
  }
  if (typeof body.hasTechUseDifficulty !== "boolean") {
    return "hasTechUseDifficulty must be a boolean";
  }
  if (typeof body.needsCellphoneAssistance !== "boolean") {
    return "needsCellphoneAssistance must be a boolean";
  }
  return true;
};
