import type { UpdateUserRequestDto } from '../../dto';

export class UpdateUserCommand {
    /**
     * Instantiate the UpdateUserCommand class.
     *
     * @param payload - The update request payload.
     * @param uuid - The uuid of the user.
     */
    public constructor(
        public readonly payload: UpdateUserRequestDto,
        public readonly uuid: string,
    ) {}
}
