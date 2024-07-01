export const mapquestionsPriority = (questionsPriority) =>{
    
    let counter=0
    for(let i =0; i< questionsPriority.length; i++){
        let [questionNumber, _] = questionsPriority[i].split(':');
   
        if(counter!= questionNumber){
            questionsPriority.splice(counter,0,counter.toString()+':0')
        }
        counter++
    }
        

    const mappAnswer = questionsPriority.map(pregunta => {
        let [questionNumber,numberPriority] = pregunta.split(':');
        
        if(numberPriority==="") numberPriority='0'
        const wordPriority = numberPriority === '1' ? 'Alta' : numberPriority === '2' ? 'Media' : numberPriority === '3'? 'Baja' : numberPriority === '0' ? '0' : 'Prioridad inválida';
        return `${questionNumber}: ${wordPriority}` 
        
      });
    return  mappAnswer
}