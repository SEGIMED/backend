export const validationOnbording = (body) => {
  if (typeof body.birthDate !== "string") {
    return false;
  }
  if (typeof body.address !== "string") {
    return false;
  }
  if (body.address.length <= 3 || body.address.length >= 50) {
    return false;
  }
  if (typeof body.genre !== "number") {
    return false;
  }
  if (typeof body.hipertPulm !== "boolean") {
    return false;
  }
  if (typeof body.centerAttention !== "number") {
    return false;
  }
  if (typeof body.liveAlone !== "boolean") {
    return false;
  }
  if (typeof body.hasTechUseDifficulty !== "boolean") {
    return false;
  }
  if (typeof body.needsCellphoneAssistance !== "boolean") {
    return false;
  }
  return true;
};
