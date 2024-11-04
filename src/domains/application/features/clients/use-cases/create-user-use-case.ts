import { hash } from 'bcrypt';

import { User } from '@/domains/resources/entities/user';
import { failure, Outcome, success } from '@/core/outcome';
import cryptographyConfig from '@/config/cryptography-config';
import { IUserRepository } from '../repositories/IClientRepository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

type Response = Outcome<
	UserAlreadyExistsError,
	{
		user: User;
	}
>;

export class CreateUserUseCase {
	constructor(private usersRepository: IUserRepository) {}

	async execute({ name, email, password }: IRequest): Promise<Response> {
		const user = await this.usersRepository.findByEmail(email);

		if (user) {
			return failure(new UserAlreadyExistsError(email));
		}

		const hashPassword = await hash(password, cryptographyConfig.HASH_SALT_LENGTH);

		const newUser = User.create({
			name,
			email,
			password: hashPassword,
		});

		await this.usersRepository.create(newUser);

		return success({ user: newUser });
	}
}
