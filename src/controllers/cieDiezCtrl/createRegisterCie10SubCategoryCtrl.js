import associateSubcategoriesWithCategories from "../../handlers/cieDiez/createRegisterwitSubCategory.js";

const createRegisterCie10SubCategoryCtrl = async (req, res) => {
  try {
    // await associateSubcategoriesWithCategories();
    res.status(200).json({ message: "Datos insertados correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al insertar los datos." });
  }
};
export default createRegisterCie10SubCategoryCtrl;
