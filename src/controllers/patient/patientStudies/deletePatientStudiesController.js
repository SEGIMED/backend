import deletePatientStudiesHandler from "../../../handlers/patient/patientStudies/deletePatientStudiesHandler.js";

const deletePatientStudiesController = async (req,res)=> {
try {
   const {id}=req.query
   const response = await deletePatientStudiesHandler({id})
   return res.status(200).json(response)
} catch (error) {
    return res.status(500).json("Ocurrió un error al borrar un estudio: " + error)
}
}

export default deletePatientStudiesController;      