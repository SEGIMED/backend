import searchCommercialDrugsHandler from "../../handlers/drugPrescription/searchCommercialDrugHandler.js";
import searchDrugsHandler from "../../handlers/drugPrescription/searchDrugsHandler.js";

const searchDrugsController = async (req, res) => {
  try {
    const { searchDrug, searchCommercialId } = req.query;

    if (searchDrug) {
      if (searchDrug.length < 3) {
        return res
          .status(400)
          .json({ message: "Escribe al menos 3 letras para la búsqueda" });
      }
      const drugs = await searchDrugsHandler(searchDrug);
      if (!drugs) {
        res.status(400).json({
          message: "No existe un médicamento con ese nombre, deberá ser creado",
        });
      } else {
        res.status(200).json( drugs );
      }
    }
    if (searchCommercialId) {
      const commercialDrug = await searchCommercialDrugsHandler(
        searchCommercialId
      );
      if (!commercialDrug) {
        res.status(400).json({
          message: "No existe un médicamento con ese nombre, deberá ser creado",
        });
      }else{
        res.status(200).json(commercialDrug)
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hubo un error al buscar los medicamentos" });
  }
};
export default searchDrugsController;
