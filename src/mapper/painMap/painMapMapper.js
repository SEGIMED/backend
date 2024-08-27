export const mapPainMap = (painMap) => {
    console.log(painMap)
    if (!painMap) {
        throw new Error('Pain map object is required.');
    }
     
    const mappedPainMap = {
        isTherePain: painMap.isTherePain || false,
        isTakingAnalgesic: painMap.isTakingAnalgesic || false,
        doesAnalgesicWorks: painMap.doesAnalgesicWorks || false,
        isWorstPainEver: painMap.isWorstPainEver || false,
        timestamp: painMap.timestamp || null,
        painDuration: painMap.painDurationDetail ? painMap.painDurationDetail.name : '',
        painAreas: mapPainAreas(painMap.painAreas || []),
        painType: painMap.painTypeDetail ? painMap.painTypeDetail.name : '',
        painScale: painMap.painScaleDetail ? painMap.painScaleDetail.name : '',
        painFrequency: painMap.painFrequencyDetail ? painMap.painFrequencyDetail.name : '',
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
export const painAreaNameMap = (painArea) => {
    switch(painArea) {
        case 1:
            return { painAreaEnglish: "trapezius", painAreaSpanish: "Trapecio" };
        case 2:
            return { painAreaEnglish: "upper-back", painAreaSpanish: "Espalda Superior" };
        case 3:
            return { painAreaEnglish: "lower-back", painAreaSpanish: "Espalda Inferior" };
        case 4:
            return { painAreaEnglish: "chest", painAreaSpanish: "Pecho" };
        case 5:
            return { painAreaEnglish: "biceps", painAreaSpanish: "Bíceps" };
        case 6:
            return { painAreaEnglish: "triceps", painAreaSpanish: "Tríceps" };
        case 7:
            return { painAreaEnglish: "forearm", painAreaSpanish: "Antebrazo" };
        case 8:
            return { painAreaEnglish: "back-deltoids", painAreaSpanish: "Deltoides Posterior" };
        case 9:
            return { painAreaEnglish: "front-deltoids", painAreaSpanish: "Deltoides Anterior" };
        case 10:
            return { painAreaEnglish: "abs", painAreaSpanish: "Abdominales" };
        case 11:
            return { painAreaEnglish: "obliques", painAreaSpanish: "Oblicuos" };
        case 12:
            return { painAreaEnglish: "adductor", painAreaSpanish: "Aductores" };
        case 13:
            return { painAreaEnglish: "hamstring", painAreaSpanish: "Isquiotibiales" };
        case 14:
            return { painAreaEnglish: "quadriceps", painAreaSpanish: "Cuádriceps" };
        case 15:
            return { painAreaEnglish: "abductors", painAreaSpanish: "Abductores" };
        case 16:
            return { painAreaEnglish: "calves", painAreaSpanish: "Pantorrillas" };
        case 17:
            return { painAreaEnglish: "gluteal", painAreaSpanish: "Glúteos" };
        case 18:
            return { painAreaEnglish: "knees", painAreaSpanish: "Rodillas" };
        case 21:
            return { painAreaEnglish: "head", painAreaSpanish: "Cabeza" };
        case 22:
            return { painAreaEnglish: "neck", painAreaSpanish: "Cuello" };
        default:
            return { painAreaEnglish: "", painAreaSpanish: "" };
    }
}


