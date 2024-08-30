import cie10Data from "../../../cie10.json" assert { type: "json" };
import { CategoryCieDiez, SubCategoriesCieDiez } from "../../databaseConfig.js";

function groupByCodePrefix(data) {
  const groupedCodes = {};

  data.forEach((item) => {
    const prefix = item.code.split(".")[0];

    if (!groupedCodes[prefix]) {
      groupedCodes[prefix] = [];
    }

    groupedCodes[prefix].push(item); // Guardamos el objeto completo (código y descripción)
  });

  return Object.values(groupedCodes);
}

async function associateSubcategoriesWithCategories() {
  const groupedCodesArray = groupByCodePrefix(cie10Data);

  try {
    let categoryCounter = 1; // Contador para las categorías
    let id = 1; // Contador para los IDs de las subcategorías

    for (const subcategories of groupedCodesArray) {
      // Busca la categoría correspondiente en la tabla categoryCieDiez
      const category = await CategoryCieDiez.findByPk(categoryCounter);

      if (category) {
        // Inserta cada subcategoría en la tabla SubCategoryCieDiez asociada a la categoría
        await Promise.all(
          subcategories.map(async ({ code, description }) => {
            await SubCategoriesCieDiez.create({
              id: id++, // Asigna un ID único
              code,
              description, // Agregamos la descripción
              categoryId: category.id, // Asociar con la categoría actual
            });
          })
        );
        categoryCounter++; // Aumenta el contador para la siguiente categoría
      }
    }

    console.log("Asociaciones completadas correctamente.");
  } catch (error) {
    console.error("Error al asociar subcategorías:", error);
  }
}

export default associateSubcategoriesWithCategories;
