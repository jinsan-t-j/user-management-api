/**
 * The HTTP request param type.
 */
export type ParamType = 'body' | 'query' | 'params';

/**
 * The JWT type definition
 */
export interface IJwt {
    /**
     * The unique identification of the access token in the database. (ID column of the access token)
     */
    uuid: string;

    /**
     * The data containing the user id and the email of the authenticated user.
     */
    data: object;

    /**
     * Time which the JWT was issued (unix timestamp)
     */
    iat: number;

    /**
     * JWT Expiry (unix timestamp).
     */

    /**
     * JWT Expiry (unix timestamp).
     */
    aud: string;

    /**
     * Subject of the JWT.
     */
    iss: string;
    /**
     *
     */
    sub: string;
}
