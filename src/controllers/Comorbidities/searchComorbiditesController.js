import searchComorbiditiesHandler from "../../handlers/Comorbidities/searchComorbiditesHandler.js"

const searchComorbiditiesController = async (req,res) =>{
try {
    const { search } = req.query
    const data = await searchComorbiditiesHandler(search)
    return res.status(200).json(data)
} catch (error) {
    return res.status(500).json("Ocurrio un error: " + error.message )
}
}
export default searchComorbiditiesController