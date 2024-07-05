export const mapPainMap = (painMap) => {
    
    return {
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
        painAreaEnglish:"head",
        painAreaSpanish:"Cabeza(Orejas, ojos, nariz, boca)"
    }}
    if (painArea==2){return {
        painAreaEnglish:"neck",
        painAreaSpanish:"Cuello"
    }}
    if (painArea==3){return {
        painAreaEnglish:"shoulders",
        painAreaSpanish:"Hombros"
    }}
    if (painArea==4){return {
        painAreaEnglish:"chest",
        painAreaSpanish:"Tórax"
    }}
    if (painArea==5){return {
        painAreaEnglish:"abs",
        painAreaSpanish:"Abdomen"
    }}
    if (painArea==6){return {
        painAreaEnglish:"obliques",
        painAreaSpanish:"Oblicuos"
    }}
    if (painArea==7){return {
        painAreaEnglish:"forearm",
        painAreaSpanish:"Antebrazos"
    }}
    if (painArea==8){return {
        painAreaEnglish:"thigh",
        painAreaSpanish:"Muslo"
    }}
    if (painArea==9){return {
        painAreaEnglish:"shin",
        painAreaSpanish:"Pantorrilla"
    }}
    if (painArea==10){return {
        painAreaEnglish:"foot",
        painAreaSpanish:"Pie"
    }}
    if (painArea==11){return {
        painAreaEnglish:"glutes",
        painAreaSpanish:"Glúteos"
    }}
    if (painArea==12){return {
        painAreaEnglish:"biceps",
        painAreaSpanish:"Biceps"
    }}
    if (painArea==13){return {
        painAreaEnglish:"triceps",
        painAreaSpanish:"Triceps"
    }}
    if (painArea==14){return {
        painAreaEnglish:"quadriceps",
        painAreaSpanish:"Cuadriceps"
    }}
    if (painArea==15){return {
        painAreaEnglish:"forearms",
        painAreaSpanish:"Antebrazos"
    }}
    if (painArea==16){return {
        painAreaEnglish:"feet",
        painAreaSpanish:"Pies"
    }}
    if (painArea==17){return {
        painAreaEnglish:"hands",
        painAreaSpanish:"Manos"
    }}
    if (painArea==18){return {
        painAreaEnglish:"adductors",
        painAreaSpanish:"Aductores"
    }}
    if (painArea==19){return {
        painAreaEnglish:"knees",
        painAreaSpanish:"Rodillas"
    }}
    if (painArea==20){return {
        painAreaEnglish:"calves",
        painAreaSpanish:"Pantorrillas"
    }}
    if (painArea==21){return {
        painAreaEnglish:"tibialis",
        painAreaSpanish:"Tibiales"
    }}
    if (painArea==22){return {
        painAreaEnglish:"deltoids",
        painAreaSpanish:"Deltoides"
    }}
    if (painArea==23){return {
        painAreaEnglish:"hair",
        painAreaSpanish:"Cabello"
    }}
    if (painArea==24){return {
        painAreaEnglish:"trapecius",
        painAreaSpanish:"Trapecios"
    }}
}