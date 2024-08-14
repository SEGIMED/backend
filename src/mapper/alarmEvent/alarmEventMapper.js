export const mapquestionsPriority = (questionsPriority) => {
    // Si questionsPriority es null o undefined, inicializamos con un array vacío
    if (!questionsPriority) return [];

    let counter = 0;
    let mappedQuestions = [];

    for (let i = 0; i < questionsPriority.length; i++) {
        let [questionNumber, _] = questionsPriority[i].split(':');

        // Si hay una brecha en los números de las preguntas, inserta la pregunta faltante con prioridad 0
        while (counter != questionNumber) {
            mappedQuestions.push(`${counter}: 0`);
            counter++;
        }

        counter++;
        mappedQuestions.push(questionsPriority[i]);
    }

    // Si quedan preguntas faltantes al final, se añaden con prioridad 0
    while (counter < questionsPriority.length) {
        mappedQuestions.push(`${counter}: 0`);
        counter++;
    }

    const mappedAnswer = mappedQuestions.map(pregunta => {
        let [questionNumber, numberPriority] = pregunta.split(':');

        if (numberPriority === "") numberPriority = '0';
        const wordPriority = numberPriority === '1' ? 'Alta' :
            numberPriority === '2' ? 'Media' :
                numberPriority === '3' ? 'Baja' :
                    numberPriority === '0' ? '0' : 'Prioridad inválida';
        return `${questionNumber}: ${wordPriority}`;
    });

    return mappedAnswer;
};
