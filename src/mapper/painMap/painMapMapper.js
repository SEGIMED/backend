export const mapPainMap = (painMap) => {
    
    return {
        isTherePain:painMap.isTherePain,
        isTakingAnalgesic: painMap.isTakingAnalgesic,
        doesAnalgesicWorks: painMap.doesAnalgesicWorks,
        isWorstPainEver: painMap.isWorstPainEver,
        timestamp: painMap.timestamp,
        painDuration: painMap.catPainDuration.name, 
        painAreas: mapPainArea(painMap.painAreas),
        painType: painMap.catPainType.name,
        painScale: painMap.catPainScale.name,
        painFrequency: painMap.catPainFrequency.name,
        painRecorderUser: {
            painRecorderUserId: painMap.painRecorderUser.id,
            painRecorderUserName: painMap.painRecorderUser.name,
            painRecorderUserLastname: painMap.painRecorderUser.lastname
        }
    }
}

const mapPainArea = (painAreas)=>{
    const painAreasMaped= painAreas.map(painAreaMap =>{
        let painAreaName = painAreaNameMap(painAreaMap.painArea)
        return{
        painArea:painAreaName,
        painNotes: painAreaMap.painNotes
    }
    })

    return painAreasMaped
}

const painAreaNameMap = (painArea)=>{
    if (painArea==1){return {
        painAreaEnglish:"trapezius",
        painAreaSpanish:"Trapecio"
    }}
    if (painArea==2){return {
        painAreaEnglish:"upper-back",
        painAreaSpanish:"Espalda Superior"
    }}
    if (painArea==3){return {
        painAreaEnglish: "lower-back",
        painAreaSpanish:"Espalda Inferior"
    }}
    if (painArea==4){return {
        painAreaEnglish:"chest",
        painAreaSpanish:"Pecho"
    }}
    if (painArea==5){return {
        painAreaEnglish:"biceps",
        painAreaSpanish:"Bíceps"
    }}
    if (painArea==6){return {
        painAreaEnglish:"triceps",
        painAreaSpanish:"Tríceps"
    }}
    if (painArea==7){return {
        painAreaEnglish:"forearm",
        painAreaSpanish:"Antebrazo"
    }}
    if (painArea==8){return {
        painAreaEnglish:"back-deltoids",
        painAreaSpanish:"Deltoides Posterior"
    }}
    if(painArea==9){return{
        painAreaEnglish:"front-deltoids",
        painAreaSpanish:"Deltoides Anterior"
    }}
    if (painArea==10){return {
        painAreaEnglish:"abs",
        painAreaSpanish:"Abdominales"
    }}
    if (painArea==11){return {
        painAreaEnglish:"obliques",
        painAreaSpanish:"Oblicuos"
    }}
    if(painArea==12){return{
        painAreaEnglish:"adductor",
        painAreaSpanish:"Aductores"
    }}
    if(painArea==13){return{
        painAreaEnglish:"hamstring",
        painAreaSpanish:"Isquiotibiales"
    }}
    if (painArea==14){return {
        painAreaEnglish:"quadriceps",
        painAreaSpanish:"Cuádriceps"
    }}
    if(painArea==15){return{
        painAreaEnglish:"abductors",
        painAreaSpanish:"Abductores"
    }}
    if (painArea==16){return {
        painAreaEnglish:"calves",
        painAreaSpanish:"Pantorrillas"
    }}
    if(painArea==17){return{
        painAreaEnglish:"gluteal",
        painAreaSpanish:"Glúteos"
    }}
    if (painArea==18){return {
        painAreaEnglish:"knees",
        painAreaSpanish:"Rodillas"
    }}
    if (painArea==19){return {
        painAreaEnglish:"right-soleus",
        painAreaSpanish:"Sóleo Derecho"
    }}
    if (painArea==20){return {
        painAreaEnglish:"left-soleus",
        painAreaSpanish:"Sóleo Izquierdo"
    }}
    if (painArea==21){return {
        painAreaEnglish:"head",
        painAreaSpanish:"Cabeza"
    }}
    if (painArea==22){return {
        painAreaEnglish:"neck",
        painAreaSpanish:"Cuello"
    }}
}

