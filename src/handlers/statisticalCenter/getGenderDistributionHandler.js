import {SociodemographicDetails} from "../../databaseConfig.js"

const getGenderDistributionHandler = async () =>{
    try {
        const women = await SociodemographicDetails.count({
            where:{
                genre:1
            }
        })
   
        const men = await SociodemographicDetails.count({
            where:{
                genre:2
            }
        })

        const totalWomenAndMen= women+men

        return ({women,men,totalWomenAndMen})
        
    } catch (error) {
        throw new Error("Error al cargar las estadísticas de género: " + error.message);
    }
}

export default getGenderDistributionHandler;