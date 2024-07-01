export const mapVitalSign = (input) => {
    return {
        measure: input.measure,
        measureSource: input.measSourceUser ? input.measSourceUser.name + " " + input.measSourceUser.lastname : null,
        measureType: input.vitalSignMeasureType.name,
        measureUnit: input.vitalSignMeasureType.measUnit.name,
        measureTimestamp: input.measureTimestamp,
    }
}
