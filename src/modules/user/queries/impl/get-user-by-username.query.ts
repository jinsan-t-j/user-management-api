/**
 * Get the user by username from the database.
 */
export class GetUserByUsernameQuery {
    /**
     * Instantiate the GetUserByUsernameQuery implementation class.
     *
     * @param username - The username of the user.
     */
    public constructor(public readonly username: string) {}
}
