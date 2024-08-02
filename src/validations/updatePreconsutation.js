export const updatePreconsultation = async (newData, existingData) => {
    return Object.keys(existingData).reduce((acc, key) => {
        acc[key] = newData[key] !== undefined ? newData[key] : existingData[key];
        return acc;
    }, {});
};
