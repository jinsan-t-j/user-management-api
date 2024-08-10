import { HttpException, HttpStatus } from '@nestjs/common';

export class NoContentException extends HttpException {
    /**
     * Instantiate the NoContentException class.
     */
    constructor() {
        super('No Content', HttpStatus.NO_CONTENT);
    }
}
