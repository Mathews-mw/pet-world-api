import { IPaginationParams } from '@/core/interfaces/IPagination';
import { Client } from '@/domains/resources/entities/client';

export interface IClientQuerySearch extends IPaginationParams {}

export interface IClientRepository {
	create(client: Client): Promise<Client>;
	update(client: Client): Promise<Client>;
	delete(clientId: string): Promise<void>;
	findMany(query: IClientQuerySearch): Promise<Client[]>;
	findById(id: string): Promise<Client | null>;
	findByCpf(cpf: string): Promise<Client | null>;
	findByEmail(email: string): Promise<Client | null>;
}
