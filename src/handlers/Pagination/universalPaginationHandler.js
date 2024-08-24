const universalPaginationHandler = async (data, page = 1, limit = 5) => {
  page = parseInt(page);
  limit = parseInt(limit);
  // Calcula el offset (desplazamiento)
  let offset = (page - 1) * limit;

  // Extrae el segmento de la data correspondiente a la página solicitada
  const paginatedItems = data.slice(offset, offset + limit);
  // Calcula el número total de páginas
  const totalPages = Math.ceil(data.length / limit);

  // Controla si la página solicitada existe
  if (page > totalPages || page <= 0) {
    throw new Error("La página solicitada no existe");
  }
  // Retorna los resultados junto con la información de la paginación
  return {
    currentPage: page,
    limit: limit,
    totalItems: data.length,
    totalPages: totalPages,
    data: paginatedItems,
  };
};

export default universalPaginationHandler;
