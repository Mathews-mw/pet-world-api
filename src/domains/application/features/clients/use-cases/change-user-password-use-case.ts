import { hash } from 'bcrypt';

import { failure, Outcome, success } from '@/core/outcome';
import cryptographyConfig from '@/config/cryptography-config';
import { IUserRepository } from '../repositories/IClientRepository';
import { NonExistentUserError } from './errors/non-existent-user-error';

interface IRequest {
	userId: string;
	password: string;
}

type Response = Outcome<NonExistentUserError, null>;

export class ChangeUserPasswordUserUseCase {
	constructor(private usersRepository: IUserRepository) {}

	async execute({ userId, password }: IRequest): Promise<Response> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			return failure(new NonExistentUserError());
		}

		const hashPassword = await hash(password, cryptographyConfig.HASH_SALT_LENGTH);

		user.password = hashPassword;

		await this.usersRepository.update(user);

		return success(null);
	}
}
