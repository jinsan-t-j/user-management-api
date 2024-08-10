/**
 * The props for search method.
 */
export interface ISearchProps {
    /**
     * The username.
     */
    username?: string;

    /**
     * The birth date by given min age.
     */
    birthDateOnMinAge?: Date;

    /**
     * The birth date by given max age.
     */
    birthDateOnMaxAge?: Date;
}
