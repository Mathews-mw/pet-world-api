import { failure, Outcome, success } from '@/core/outcome';
import { IUserRepository } from '../repositories/IClientRepository';
import { User, UserRoleType } from '@/domains/resources/entities/user';
import { NonExistentUserError } from './errors/non-existent-user-error';

interface IRequest {
	userId: string;
	name?: string;
	email?: string;
	userRole?: UserRoleType;
	active?: boolean;
}

type Response = Outcome<
	NonExistentUserError,
	{
		user: User;
	}
>;

export class UpdateUserUseCase {
	constructor(private usersRepository: IUserRepository) {}

	async execute({ userId, name, email, userRole, active }: IRequest): Promise<Response> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			return failure(new NonExistentUserError());
		}

		user.name = name ?? user.name;
		user.email = email ?? user.email;
		user.userRole = userRole ?? user.userRole;
		user.active = active ?? user.active;

		await this.usersRepository.update(user);

		return success({ user });
	}
}
