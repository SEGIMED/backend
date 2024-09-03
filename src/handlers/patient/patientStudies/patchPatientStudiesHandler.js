import { PatientStudies, sequelize } from "../../../databaseConfig.js";
import { loadFile } from "../../../utils/cloudinary/cloudinary.js";
import validateStudiesInput from "../../../validations/validatesStudies.js";

const patchPatientStudiesHandler = async (body) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    validateStudiesInput(body);

    const updatedStudies = await Promise.all(
      body.studies.map(async (studyObject) => {
        const studyRecord = await PatientStudies.findOne({
          where: {
            id: studyObject.id,
          },
          transaction,
        });

        if (!studyRecord) {
          throw new Error(`Estudio con ID ${studyObject.id} no encontrado.`);
        }

        const updateData = {
          studyType: studyObject.studyType ?? 10,
          description: studyObject.description,
          title: studyObject.title,
          updatedAt: new Date().toISOString(),
        };

        if (studyObject.study) {
          const isExistingUrl = studyObject.study.startsWith("http");

          if (!isExistingUrl) {
            const file = await loadFile(studyObject.study);
            updateData.study = file?.secure_url || null;
          } else {
            updateData.study = studyObject.study;
          }
        } else {
          updateData.study = null;
        }

        return PatientStudies.update(updateData, {
          where: {
            id: studyObject.id,
          },
          transaction,
        });
      })
    );

    await transaction.commit();
    return updatedStudies;
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    throw new Error(
      "Hubo un error al actualizar los registros de los estudios: " +
        error.message
    );
  }
};

export default patchPatientStudiesHandler;
