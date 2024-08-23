import physicalSelfEvaluationHandler from "../../handlers/painMap/physicalSelfEvaluationHandler.js";

const physicalSelfEvaluationController = async (req, res) => {
  try {
    const body = req.body;

    const data = await physicalSelfEvaluationHandler(body);

    return res.status(200).json(data);
  } catch (error) {
    throw new Error(
      "Ocurrió un error al guardar los datos de la autoevaluación: " + error
    );
  }
};

export default physicalSelfEvaluationController;
