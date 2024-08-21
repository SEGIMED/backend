const validateDrugCreationData = (body) => {
    const {
      drugName,
      commercialDrugName,
      presentationId,
      dose,
      measureUnitId,
      routeOfAdministrationId,
    } = body;
  
    const errors = [];
  
    if (!drugName || typeof drugName !== 'string') {
      errors.push("El nombre de la droga es requerido y debe ser una cadena de texto válida.");
    }
  
    if (!commercialDrugName || typeof commercialDrugName !== 'string') {
      errors.push("El nombre comercial de la droga es requerido y debe ser una cadena de texto válida.");
    }
  
    if (!presentationId || typeof presentationId !== 'number') {
      errors.push("El ID de la presentación es requerido y debe ser un número.");
    }
  
    if (!dose || typeof dose !== 'number') {
      errors.push("La dosis es requerida y debe ser un número.");
    }
  
    if (!measureUnitId || typeof measureUnitId !== 'number') {
      errors.push("El ID de la unidad de medida es requerido y debe ser un número.");
    }
  
    if (!routeOfAdministrationId || typeof routeOfAdministrationId !== 'number') {
      errors.push("El ID de la vía de administración es requerido y debe ser un número.");
    }
  
    if (errors.length > 0) {
      throw new Error(errors.join(" "));
    }
  };
  
  export default validateDrugCreationData;
  