/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import StandardError from './standardError.js';

class BadRequest extends StandardError {
    constructor(message) {
        super(message, 400);
    }
}

export default BadRequest;
