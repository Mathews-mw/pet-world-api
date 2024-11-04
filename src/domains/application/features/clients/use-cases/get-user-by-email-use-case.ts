import { User } from '@/domains/resources/entities/user';
import { failure, Outcome, success } from '@/core/outcome';
import { IUserRepository } from '../repositories/IClientRepository';
import { NonExistentUserError } from './errors/non-existent-user-error';

interface IRequest {
	email: string;
}

type Response = Outcome<
	NonExistentUserError,
	{
		user: User;
	}
>;

export class GetUserByEmailUseCase {
	constructor(private usersRepository: IUserRepository) {}

	async execute({ email }: IRequest): Promise<Response> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			return failure(new NonExistentUserError());
		}

		return success({ user });
	}
}
