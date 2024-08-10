/**
 * Get the user by uuid from the database.
 */
export class GetUserByUuidQuery {
    /**
     * Instantiate the GetUserByUuidQuery implementation class.
     *
     * @param uuid - The uuid of the user.
     */
    public constructor(public readonly uuid: string) {}
}
