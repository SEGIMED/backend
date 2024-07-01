export default (timezone) => {
    // Crear un objeto Date
    var date = new Date();

    // Usar toLocaleString para convertir la fecha al huso horario del país
    var hour = date.toLocaleString("es-ES", {timeZone: timezone});

    return hour;
}

 