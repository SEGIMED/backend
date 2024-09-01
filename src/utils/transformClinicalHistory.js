export function transformData(input) {
  const transformedData = {
    // Asigna el valor de scheduledStartTimestamp a timestamp
    timestamp: input.appSch.scheduledStartTimestamp,
    // Asigna physicianThatAttend a physician, añadiendo "Dr." al nombre
    physician: {
      name: `Dr. ${input.appSch.physicianThatAttend.name}`,
      lastname: input.appSch.physicianThatAttend.lastname,
    },
    // Asigna un valor fijo a attendancePlace, ya que no está en el original
    attendancePlace: {
      alias: "Centro Médico ABC",
    },
    // Toma el valor de chiefComplaint si está definido, de lo contrario usa un valor por defecto
    chiefComplaint: input.chiefComplaint || "Dolor de cabeza persistente",
  };

  // Copia los datos restantes excepto los que ya han sido usados
  const remainingData = {
    ...input,
    appSch: {
      ...input.appSch,
      scheduledStartTimestamp: undefined, // Lo hemos usado como timestamp
      physicianThatAttend: undefined, // Lo hemos usado como physician
    },
    chiefComplaint: undefined, // Lo hemos usado como chiefComplaint
  };
}
