export const mapPainMap = (painMap) => {
    if (!painMap) {
        throw new Error('Pain map object is required.');
    }

    const mappedPainMap = {
        isTherePain: painMap.isTherePain || false,
        isTakingAnalgesic: painMap.isTakingAnalgesic || false,
        doesAnalgesicWorks: painMap.doesAnalgesicWorks || false,
        isWorstPainEver: painMap.isWorstPainEver || false,
        timestamp: painMap.timestamp || null,
        painDuration: painMap.catPainDuration ? painMap.catPainDuration.name : '',
        painAreas: mapPainAreas(painMap.painAreas || []),
        painType: painMap.catPainType ? painMap.catPainType.name : '',
        painScale: painMap.catPainScale ? painMap.catPainScale.name : '',
        painFrequency: painMap.catPainFrequency ? painMap.catPainFrequency.name : '',
        painRecorderUser: {
            painRecorderUserId: painMap.painRecorderUser ? painMap.painRecorderUser.id : '',
            painRecorderUserName: painMap.painRecorderUser ? painMap.painRecorderUser.name : '',
            painRecorderUserLastname: painMap.painRecorderUser ? painMap.painRecorderUser.lastname : ''
        }
    };

    return mappedPainMap;
};

const mapPainAreas = (painAreas) => {
    if (!Array.isArray(painAreas)) {
        throw new Error('Pain areas must be provided as an array.');
    }

    return painAreas.map(painArea => ({
        painArea: painAreaNameMap(painArea.painArea),
        painNotes: painArea.painNotes || ''
    }));
};
const painAreaNameMap = (painArea) => {
    if (painArea == 1) {
        return {
            painAreaEnglish: "trapezius",
            painAreaSpanish: "Trapecio"
        }
    }
    if (painArea == 2) {
        return {
            painAreaEnglish: "upper-back",
            painAreaSpanish: "Espalda Superior"
        }
    }
    if (painArea == 3) {
        return {
            painAreaEnglish: "lower-back",
            painAreaSpanish: "Espalda Inferior"
        }
    }
    if (painArea == 4) {
        return {
            painAreaEnglish: "chest",
            painAreaSpanish: "Pecho"
        }
    }
    if (painArea == 5) {
        return {
            painAreaEnglish: "biceps",
            painAreaSpanish: "Bíceps"
        }
    }
    if (painArea == 6) {
        return {
            painAreaEnglish: "triceps",
            painAreaSpanish: "Tríceps"
        }
    }
    if (painArea == 7) {
        return {
            painAreaEnglish: "forearm",
            painAreaSpanish: "Antebrazo"
        }
    }
    if (painArea == 8) {
        return {
            painAreaEnglish: "back-deltoids",
            painAreaSpanish: "Deltoides Posterior"
        }
    }
    if (painArea == 9) {
        return {
            painAreaEnglish: "front-deltoids",
            painAreaSpanish: "Deltoides Anterior"
        }
    }
    if (painArea == 10) {
        return {
            painAreaEnglish: "abs",
            painAreaSpanish: "Abdominales"
        }
    }
    if (painArea == 11) {
        return {
            painAreaEnglish: "obliques",
            painAreaSpanish: "Oblicuos"
        }
    }
    if (painArea == 12) {
        return {
            painAreaEnglish: "adductor",
            painAreaSpanish: "Aductores"
        }
    }
    if (painArea == 13) {
        return {
            painAreaEnglish: "hamstring",
            painAreaSpanish: "Isquiotibiales"
        }
    }
    if (painArea == 14) {
        return {
            painAreaEnglish: "quadriceps",
            painAreaSpanish: "Cuádriceps"
        }
    }
    if (painArea == 15) {
        return {
            painAreaEnglish: "abductors",
            painAreaSpanish: "Abductores"
        }
    }
    if (painArea == 16) {
        return {
            painAreaEnglish: "calves",
            painAreaSpanish: "Pantorrillas"
        }
    }
    if (painArea == 17) {
        return {
            painAreaEnglish: "gluteal",
            painAreaSpanish: "Glúteos"
        }
    }
    if (painArea == 18) {
        return {
            painAreaEnglish: "knees",
            painAreaSpanish: "Rodillas"
        }
    }
    if (painArea == 19) {
        return {
            painAreaEnglish: "right-soleus",
            painAreaSpanish: "Sóleo Derecho"
        }
    }
    if (painArea == 20) {
        return {
            painAreaEnglish: "left-soleus",
            painAreaSpanish: "Sóleo Izquierdo"
        }
    }
    if (painArea == 21) {
        return {
            painAreaEnglish: "head",
            painAreaSpanish: "Cabeza"
        }
    }
    if (painArea == 22) {
        return {
            painAreaEnglish: "neck",
            painAreaSpanish: "Cuello"
        }
    }
}