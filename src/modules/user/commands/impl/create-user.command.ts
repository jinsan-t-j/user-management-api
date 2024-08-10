import type { CreateUserRequestDto } from '../../dto';

export class CreateUserCommand {
    /**
     * Instantiate the CreateUserCommand class.
     *
     * @param payload - The create request payload.
     */
    public constructor(public readonly payload: CreateUserRequestDto) {}
}
