import { failure, Outcome, success } from '@/core/outcome';
import { Client } from '@/domains/resources/entities/client';
import { NonExistentClientError } from './errors/non-existent-client-error';
import { IClientRepository } from '../../clients/repositories/IClientRepository';

interface IRequest {
	clientId: string;
}

type Response = Outcome<
	NonExistentClientError,
	{
		client: Client;
	}
>;

export class GetClientByIdUseCase {
	constructor(private clientsRepository: IClientRepository) {}

	async execute({ clientId }: IRequest): Promise<Response> {
		const client = await this.clientsRepository.findById(clientId);

		if (!client) {
			return failure(new NonExistentClientError());
		}

		return success({ client });
	}
}
