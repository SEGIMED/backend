import insertCieDiezCategories from "../../handlers/cieDiez/createRegisterCie10.js";

const createRegisterCie10Ctrl = async (req, res) => {
  try {
    // await insertCieDiezCategories();
    res.status(200).json({ message: "Datos insertados correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al insertar los datos." });
  }
};
export default createRegisterCie10Ctrl;
// * En el caso que se necesite se descomenta y ejecuta el archivo para insertar los datos en la base de datos.
