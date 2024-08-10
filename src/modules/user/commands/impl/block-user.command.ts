export class BlockUserCommand {
    /**
     * Instantiate the BlockUserCommand class.
     *
     * @param uuid - The user uuid.
     * @param isBlocked - To determine the user is whether blocked or not.
     */
    public constructor(
        public readonly uuid: string,
        public readonly isBlocked: boolean,
    ) {}
}
