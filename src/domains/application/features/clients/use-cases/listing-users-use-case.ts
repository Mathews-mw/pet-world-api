import { Outcome, success } from '@/core/outcome';
import { User } from '@/domains/resources/entities/user';
import { IUserRepository } from '../repositories/IClientRepository';

interface IRequest {
	currentPage: number;
	itemsPerPage: number;
}

type Response = Outcome<
	null,
	{
		users: User[];
	}
>;

export class GetUserByIdUseCase {
	constructor(private usersRepository: IUserRepository) {}

	async execute({ currentPage, itemsPerPage }: IRequest): Promise<Response> {
		const users = await this.usersRepository.findMany({
			page: currentPage,
			perPage: itemsPerPage,
		});

		return success({ users });
	}
}
