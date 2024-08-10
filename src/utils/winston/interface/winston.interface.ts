/**
 * The Http Adapter response body.
 */
export interface IHttpAdapterResponseBody {
    /**
     * The status code of the exception.
     */
    status: number;

    /**
     * The message of the exception.
     */
    message: string;

    /**
     * The stack of the exception.
     */
    data?: {
        stack?: string;
    };
}
