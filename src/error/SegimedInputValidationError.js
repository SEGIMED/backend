import SegimedAPIError from "./SegimedAPIError.js";

class SegimedInputValidationError extends SegimedAPIError {

    constructor(message) {
        super(message, 400)
    }
}

export default SegimedInputValidationError