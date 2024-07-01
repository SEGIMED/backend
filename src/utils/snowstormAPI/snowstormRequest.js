import axios from "axios";

const baseURL = "https://snowstorm-fhir.snomedtools.org/fhir";

// Función para buscar conceptos
export const searchConcepts = async (query) => {
  try {
    const response = await axios.get(`${baseURL}/CodeSystem/$lookup`, {
      params: {
        system: "http://snomed.info/sct",
        code: query,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching concepts: ${error}`);
  }
}

// Función para obtener un concepto por su ID
export const getConceptById = async (conceptId) => {
  try {
    const response = await axios.get(`${baseURL}/CodeSystem/$lookup`, {
      params: {
        system: "http://snomed.info/sct",
        code: conceptId,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching concept by ID: ${error}`);
  }
}

// Función para buscar un medicamento por descripción
export const searchMedication = async (medicationName) => {
    try {
      const response = await axios.get(`${baseURL}/ValueSet/$expand`, {
        params: {
          url: 'http://snomed.info/sct?fhir_vs=ecl/<123456', // Reemplaza <123456> con el ECL del medicamento
          filter: medicationName,
          count: 10
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching medication: ${error}`);
    }
  }

// Ejemplos de uso
searchConcepts("aspirin");
getConceptById("123456");
searchMedication('aspirin');
