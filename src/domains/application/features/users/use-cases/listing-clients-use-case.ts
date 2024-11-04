import { Outcome, success } from '@/core/outcome';
import { Client } from '@/domains/resources/entities/client';
import { IClientRepository } from '../../clients/repositories/IClientRepository';

interface IRequest {
	currentPage: number;
	itemsPerPage: number;
}

type Response = Outcome<
	null,
	{
		clients: Client[];
	}
>;

export class GetClientByIdUseCase {
	constructor(private clientsRepository: IClientRepository) {}

	async execute({ currentPage, itemsPerPage }: IRequest): Promise<Response> {
		const clients = await this.clientsRepository.findMany({
			page: currentPage,
			perPage: itemsPerPage,
		});

		return success({ clients });
	}
}
