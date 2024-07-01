
export const mapDiagnosticTest = (diagnosticTest) => {
    return {
        id: diagnosticTest.id,
        resultsInterpretation: diagnosticTest.resultsInterpretation,
        fileUrl: diagnosticTest.fileUrl,
        practicedTimestamp: diagnosticTest.practicedTimestamp,
        registeredTimestamp: diagnosticTest.registeredTimestamp,
        diagnosticTestType: diagnosticTest.catDiagnosticTestType.name
    }
}
