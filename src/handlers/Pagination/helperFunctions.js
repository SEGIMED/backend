export const transformPhysicianData = (physician) => {
  const physicianData = physician.get({ plain: true });
  physicianData.physicianAttendancePlaces =
    physicianData.physicianAttendancePlaces[0] || null;
  return physicianData;
};

export const transformPhysicianDataPagination = (physician) => {
  physician.physicianAttendancePlaces =
    physician.physicianAttendancePlaces[0] || null;
  return physician;
};
