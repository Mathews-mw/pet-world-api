import { hash } from 'bcrypt';

import { failure, Outcome, success } from '@/core/outcome';
import cryptographyConfig from '@/config/cryptography-config';
import { NonExistentClientError } from './errors/non-existent-client-error';
import { IClientRepository } from '../../clients/repositories/IClientRepository';

interface IRequest {
	clientId: string;
	password: string;
}

type Response = Outcome<NonExistentClientError, null>;

export class ChangeClientPasswordClientUseCase {
	constructor(private clientsRepository: IClientRepository) {}

	async execute({ clientId, password }: IRequest): Promise<Response> {
		const client = await this.clientsRepository.findById(clientId);

		if (!client) {
			return failure(new NonExistentClientError());
		}

		const hashPassword = await hash(password, cryptographyConfig.HASH_SALT_LENGTH);

		client.password = hashPassword;

		await this.clientsRepository.update(client);

		return success(null);
	}
}
