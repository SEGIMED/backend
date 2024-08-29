const universalOrderByHandler = async (
  data,
  orderBy = "timestamp",
  orderAsc = true
) => {
  //este componente reciebe un array de objetos y los ordena por propiedad deseada, y en la forma deseada. default "timestamp", true
  if (!Array.isArray(data)) {
    throw new Error("Input data must be an array of objects.");
  }

  // Check if all items have the orderBy property
  if (data.length > 0 && !data.every((item) => item.hasOwnProperty(orderBy))) {
    throw new Error(
      `Not all items in the array have the property '${orderBy}'.`
    );
  }

  const sortedData = data.sort((a, b) => {
    // Check if the properties exist in the objects
    if (!a.hasOwnProperty(orderBy) || !b.hasOwnProperty(orderBy)) {
      return 0;
    }

    // Compare values
    if (a[orderBy] < b[orderBy]) return orderAsc ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderAsc ? 1 : -1;
    return 0;
  });

  return sortedData;
};

export default universalOrderByHandler;
