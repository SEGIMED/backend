import getBackgroundDetailHandler from "../extras/getBackgroundDetailHandler.js";

const getBackgroundTabHandler = async ({ id }) => {
  try {
    const background = await getBackgroundDetailHandler({ id });
    if (background === null)
      return {
        background: null,
        risk: null,
        comorbidities: null,
      };
    const { patientUser, ...backgroundClear } = background;
    const { comorbidities, ...patientUserClear } = patientUser;
    return {
      background: backgroundClear,
      risk: patientUserClear,
      comorbidities,
    };
  } catch (error) {
    throw new Error(
      "Ocurrio un error al recuperar los antecedentes: " + error.message
    );
  }
};
export default getBackgroundTabHandler;
