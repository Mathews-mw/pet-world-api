import { hash } from 'bcrypt';

import { Client } from '@/domains/resources/entities/client';
import { failure, Outcome, success } from '@/core/outcome';
import cryptographyConfig from '@/config/cryptography-config';
import { IClientRepository } from '../../clients/repositories/IClientRepository';
import { ClientAlreadyExistsError } from './errors/client-already-exists-error';

interface IRequest {
	name: string;
	email: string;
	password: string;
	cpf: string;
	phone?: string | null;
}

type Response = Outcome<
	ClientAlreadyExistsError,
	{
		client: Client;
	}
>;

export class RegisterClientUseCase {
	constructor(private clientsRepository: IClientRepository) {}

	async execute({ name, email, password, cpf, phone }: IRequest): Promise<Response> {
		const client = await this.clientsRepository.findByEmail(email);

		if (client) {
			return failure(new ClientAlreadyExistsError(email));
		}

		const hashPassword = await hash(password, cryptographyConfig.HASH_SALT_LENGTH);

		const newClient = Client.create({
			name,
			email,
			password: hashPassword,
			cpf,
			phone,
		});

		await this.clientsRepository.create(newClient);

		return success({ client: newClient });
	}
}
