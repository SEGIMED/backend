
export const mapPhysicalExamination = (physicalExamination) => {
    return {
        id: physicalExamination.id,
        description: physicalExamination.description,
        physicalSubsystem: physicalExamination.catPhysicalSubsystem.name
    }
}
