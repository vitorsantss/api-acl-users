/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import StandardError from './standardError.js';

class NotFound extends StandardError {
    constructor(message) {
        super(message, 404);
    }
}

export default NotFound;