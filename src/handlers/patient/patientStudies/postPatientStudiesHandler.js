import { PatientStudies } from "../../../databaseConfig.js";
import { loadFile } from "../../../utils/cloudinary/cloudinary.js";

const postPatientStudiesHandler = async (body) => {
  try {
    //TODO meter el transaction
    //TODO validación de que body si sean los archivos esperados

    //body.studies must be an [{},{}]
    const mapStudies = await Promise.all(
      body.studies.map(async (studyObject) => {
        if (studyObject.study) {
          // let parsetStudy = JSON.parse(studyObject.study);
          const file = await loadFile(studyObject.study); //! SI ya es una URL  se deja así, pero si viene como una cadena de texto toca parsearlo antes y se descomentaría la línea de arriba
          studyObject.study = file?.url;
        }
        return {
          patient: body.patientId,
          schedule: body.scheduleId ?? null,
          study: studyObject.study,
          studyType: studyObject.studyType ?? 10,
          description: studyObject.description ?? null,
        };
      })
    );

    const studiesCreated = await PatientStudies.bulkCreate(mapStudies);

    return studiesCreated;
  } catch (error) {
    throw new Error(
      "Hubo un error al crear los registros de los estudios: " + error.message
    );
  }
};

export default postPatientStudiesHandler;
