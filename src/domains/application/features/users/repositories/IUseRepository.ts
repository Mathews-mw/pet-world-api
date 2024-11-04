import { IPaginationParams } from '@/core/interfaces/IPagination';
import { User } from '@/domains/resources/entities/user';

export interface IUserQuerySearch extends IPaginationParams {}

export interface IUserRepository {
	create(user: User): Promise<User>;
	update(user: User): Promise<User>;
	delete(id: string): Promise<void>;
	findMany(query: IUserQuerySearch): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
}
