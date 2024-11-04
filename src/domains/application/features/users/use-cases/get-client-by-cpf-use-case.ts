import { failure, Outcome, success } from '@/core/outcome';
import { Client } from '@/domains/resources/entities/client';
import { NonExistentClientError } from './errors/non-existent-client-error';
import { IClientRepository } from '../../clients/repositories/IClientRepository';

interface IRequest {
	cpf: string;
}

type Response = Outcome<
	NonExistentClientError,
	{
		client: Client;
	}
>;

export class GetClientByCpfUseCase {
	constructor(private clientsRepository: IClientRepository) {}

	async execute({ cpf }: IRequest): Promise<Response> {
		const client = await this.clientsRepository.findByCpf(cpf);

		if (!client) {
			return failure(new NonExistentClientError());
		}

		return success({ client });
	}
}
