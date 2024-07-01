export const mapPainMap = (painMap) => {
    return {
        painNotes: painMap.painNotes,
        isTakingAnalgesic: painMap.isTakingAnalgesic,
        doesAnalgesicWorks: painMap.doesAnalgesicWorks,
        isWorstPainEver: painMap.isWorstPainEver,
        timestamp: painMap.timestamp,
        painDuration: painMap.catPainDuration.name,
        painArea: painMap.catPainArea.name,
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