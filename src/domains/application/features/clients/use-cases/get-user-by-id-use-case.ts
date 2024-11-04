import { User } from '@/domains/resources/entities/user';
import { failure, Outcome, success } from '@/core/outcome';
import { IUserRepository } from '../repositories/IClientRepository';
import { NonExistentUserError } from './errors/non-existent-user-error';

interface IRequest {
	userId: string;
}

type Response = Outcome<
	NonExistentUserError,
	{
		user: User;
	}
>;

export class GetUserByIdUseCase {
	constructor(private usersRepository: IUserRepository) {}

	async execute({ userId }: IRequest): Promise<Response> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			return failure(new NonExistentUserError());
		}

		return success({ user });
	}
}
