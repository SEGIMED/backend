export const mapAnthropometricDetail = (input) => {
    return {
        measure: input.measure,
        measureDate: input.measureDate,
        measureSource: input.measSourcePhys ? input.measSourcePhys.name + " " + input.measSourcePhys.lastname : null,
        measureType: input.anthMeasType.name,
        measureUnit: input.anthMeasType.measUnit.name,
    }
}