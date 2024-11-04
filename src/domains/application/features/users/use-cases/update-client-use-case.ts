import { failure, Outcome, success } from '@/core/outcome';
import { Client } from '@/domains/resources/entities/client';
import { NonExistentClientError } from './errors/non-existent-client-error';
import { IClientRepository } from '../../clients/repositories/IClientRepository';

interface IRequest {
	clientId: string;
	name?: string;
	email?: string;
	cpf?: string;
	phone?: string | null;
}

type Response = Outcome<
	NonExistentClientError,
	{
		client: Client;
	}
>;

export class UpdateClientUseCase {
	constructor(private clientsRepository: IClientRepository) {}

	async execute({ clientId, name, email, cpf, phone }: IRequest): Promise<Response> {
		const client = await this.clientsRepository.findById(clientId);

		if (!client) {
			return failure(new NonExistentClientError());
		}

		client.name = name ?? client.name;
		client.email = email ?? client.email;
		client.cpf = cpf ?? client.cpf;
		client.phone = phone ?? client.phone;

		await this.clientsRepository.update(client);

		return success({ client });
	}
}
