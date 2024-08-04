export const validationOnbording = (body) => {
  if (typeof body.birthDate !== "string") {
    throw new Error("birthDate must be a string");
  }
  if (typeof body.address !== "string") {
    throw new Error("address must be a string");
  }
  if (typeof body.genre !== "number") {
    throw new Error("genre must be a number");
  }
  if (typeof body.hipertPulm !== "boolean") {
    throw new Error("hipertPulm must be a boolean");
  }
  if (typeof body.centerAttention !== "number") {
    throw new Error("centerAttention must be a number");
  }
  if (typeof body.liveAlone !== "boolean") {
    throw new Error("liveAlone must be a boolean");
  }
  if (typeof body.hasTechUseDifficulty !== "boolean") {
    throw new Error("hasTechUseDifficulty must be a boolean");
  }
  if (typeof body.needsCellphoneAssistance !== "boolean") {
    throw new Error("needsCellphoneAssistance must be a boolean");
  }
  return true;
};
