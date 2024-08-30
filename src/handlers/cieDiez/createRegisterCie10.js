import cie10Data from "../../../cie10B.json" assert { type: "json" };
import { CategoryCieDiez } from "../../databaseConfig.js";

async function insertCieDiezCategories() {
  try {
    let idCounter = 1; // Inicializar el contador para el ID

    cie10Data.forEach(async (item) => {
      await CategoryCieDiez.create({
        id: idCounter++, // Incrementa el ID automáticamente
        code: item.code,
        description: item.description,
      });
    });
    return "Datos insertados correctamente.";
  } catch (error) {
    console.error("Error al insertar los datos:", error);
  }
}

export default insertCieDiezCategories;
