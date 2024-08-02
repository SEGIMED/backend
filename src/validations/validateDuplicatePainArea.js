const validateDuplicatePainArea = (painRecordsToCreate) => {
  const seenPainAreas = new Set();
  for (const obj of painRecordsToCreate.painAreas) {
    if (seenPainAreas.has(obj.painArea)) {
      return false;
    }
    seenPainAreas.add(obj.painArea);
  }
  return true;
};

export default validateDuplicatePainArea;
