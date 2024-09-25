import models from "../../../databaseConfig.js";
import { loadStudiesInterconsultation } from "../../../utils/cloudinary/cloudinary.js";
import contextService from "request-context";

const fileLimits = {
  1: 2,
  2: 2,
  3: 2,
  4: 1,
  5: 1,
  6: Infinity,
};

const patchPhysicianFilesHandler = async ({ files }) => {
  try {
    const physicianId = contextService.get("request:user").userId;
    console.log(files)
    if (files && Array.isArray(files)) {
      const validFiles = [];

      for (let file of files) {
        const { typeId, data } = file;

        const existingFiles = await models.PhysicianFiles.count({
          where: { fileType: typeId },
        });

        const fileLimit = fileLimits[typeId];

        if (existingFiles >= fileLimit) {
          throw new Error(
            `No puedes subir más de ${fileLimit} archivos para el tipo de archivo ID ${typeId}`
          );
        }

        const uploadResult = await loadStudiesInterconsultation([file]);

        validFiles.push({ typeId, url: uploadResult.success[0].url });
      }

      for (let validFile of validFiles) {
        await models.PhysicianFiles.create({
          physicianId,
          fileType: validFile.typeId,
          url: validFile.url,
        });
      }

      return { message: "Archivos subidos correctamente", files: validFiles };
    } else {
      throw new Error("No se proporcionaron archivos para subir");
    }
  } catch (error) {
    throw new Error(`Error al subir los archivos: ${error.message}`);
  }
};

export default patchPhysicianFilesHandler;
