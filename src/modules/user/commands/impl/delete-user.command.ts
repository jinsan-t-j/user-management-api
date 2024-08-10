export class DeleteUserCommand {
    /**
     * Instantiate the DeleteUserCommand class.
     *
     * @param uuid - The user uuid.
     */
    public constructor(public readonly uuid: string) {}
}
