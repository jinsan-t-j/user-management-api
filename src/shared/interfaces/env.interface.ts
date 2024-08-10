/**
 * The environment variable type definitions.
 */
export interface IEnvs {
    /**
     * The Application name.
     */
    APP_NAME: string;

    /**
     * The Application environment.
     */
    APP_ENV: string;

    /**
     * The Application URL.
     */
    APP_URL: string;

    /**
     * The Application running port.
     */
    APP_PORT: number;

    /**
     * The database server type.
     */
    DATABASE_TYPE: string;

    /**
     * The database server host address.
     */
    DATABASE_HOST: string;

    /**
     * The database name.
     */
    DATABASE_NAME: string;

    /**
     * The database username.
     */
    DATABASE_USERNAME: string;

    /**
     * The database password.
     */
    DATABASE_PASSWORD: string;

    /**
     * The database server port.
     */
    DATABASE_PORT: number;

    /**
     * The API throttle TTL.
     */
    API_THROTTLE_TTL: number;

    /**
     * The API_THROTTLE_LIMIT.
     */
    API_THROTTLE_LIMIT: number;

    /**
     * The Swagger API documentation URL path.
     */
    SWAGGER_DOC_URL_PATH?: string;
}
