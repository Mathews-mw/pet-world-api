import { failure, Outcome, success } from '@/core/outcome';
import { Client } from '@/domains/resources/entities/client';
import { NonExistentClientError } from './errors/non-existent-client-error';
import { IClientRepository } from '../../clients/repositories/IClientRepository';

interface IRequest {
	email: string;
}

type Response = Outcome<
	NonExistentClientError,
	{
		client: Client;
	}
>;

export class GetClientByEmailUseCase {
	constructor(private clientsRepository: IClientRepository) {}

	async execute({ email }: IRequest): Promise<Response> {
		const client = await this.clientsRepository.findByEmail(email);

		if (!client) {
			return failure(new NonExistentClientError());
		}

		return success({ client });
	}
}
