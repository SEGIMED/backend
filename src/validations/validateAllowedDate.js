//Validation for format of a date ISO 8601
const validateAllowedDate = (dateString)=>{
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

export default validateAllowedDate