import createDrugPrescriptionHandler from "../../../handlers/drugPrescription/createDrugPrescriptionHandler.js";
import createNewOrderHandler from "../../../handlers/physicianHandlers/orders/createNewOrderHandlers.js";

const createOrderPhysicianCtrl = async (req, res) => {
  try {
    const { body } = req;
    const { prescriptionCreation, drugDetailPresentationId, drugCreation } =
      body.bodyMedicam;
    console.log(prescriptionCreation);
    const newOrder = await createNewOrderHandler(body);
    const { commercialDrugName } = drugCreation;
    prescriptionCreation.medicalOrderId = newOrder.id;
    const newMedicalRegister = await createDrugPrescriptionHandler({
      ...prescriptionCreation,
      drugDetailPresentationId: drugDetailPresentationId,
      commercialNameDrugId: commercialDrugName,
    });
    const response = {
      newOrder,
      newMedicalRegister,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

// se debe dividir el body para que una parte se mande en el medicamentos
// y la otra en la orden medica

export default createOrderPhysicianCtrl;
