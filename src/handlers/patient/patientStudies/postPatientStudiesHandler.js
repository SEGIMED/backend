import { PatientStudies, sequelize } from "../../../databaseConfig.js";
import { loadFile } from "../../../utils/cloudinary/cloudinary.js";
import validateStudiesInput from "../../../validations/validatesStudies.js";

const postPatientStudiesHandler = async (body) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    validateStudiesInput(body);

    const mapStudies = await Promise.all(
      body.studies.map(async (studyObject) => {
        if (studyObject.study) {
          // let parsetStudy = JSON.parse(studyObject.study);
          const file = await loadFile(studyObject.study); //! SI ya es una URL  se deja así, pero si viene como una cadena de texto toca parsearlo antes y se descomentaría la línea de arriba
          studyObject.study = file?.secure_url || null;
        }
        return {
          userId: body.userId,
          schedule: body.scheduleId ?? null,
          study: studyObject.study,
          studyType: studyObject.studyType ?? 10,
          description: studyObject.description,
          title: studyObject.title,
          createdAt: new Date().toISOString(),
        };
      })
    );

    const studiesCreated = await PatientStudies.bulkCreate(mapStudies, {
      transaction,
    });
    await transaction.commit();
    return studiesCreated;
  } catch (error) {
    await transaction.rollback();
    throw new Error(
      "Hubo un error al crear los registros de los estudios: " + error.message
    );
  }
};

export default postPatientStudiesHandler;
