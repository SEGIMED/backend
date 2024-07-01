import SegimedAPIError from "./SegimedAPIError.js";

class SegimedAuthenticationError extends SegimedAPIError {

    constructor(message) {
        super(message, 401)
    }
}

export default SegimedAuthenticationError