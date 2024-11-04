import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface IClient {
	name: string;
	email: string;
	password: string;
	cpf: string;
	phone?: string | null;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class Client extends Entity<IClient> {
	get name() {
		return this.props.name;
	}

	set name(name: string) {
		this.props.name = name;
		this.touch();
	}

	get email() {
		return this.props.email;
	}

	set email(email: string) {
		this.props.email = email;
		this.touch();
	}

	get password() {
		return this.props.password;
	}

	set password(password: string) {
		this.props.password = password;
		this.touch();
	}

	get cpf() {
		return this.props.cpf;
	}

	set cpf(cpf: string) {
		this.props.cpf = cpf;
		this.touch();
	}

	get phone(): string | null | undefined {
		return this.props.phone;
	}

	set phone(phone: string | null | undefined) {
		this.props.phone = phone;
		this.touch();
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	static create(props: Optional<IClient, 'createdAt' | 'updatedAt'>, id?: UniqueEntityId) {
		const client = new Client(
			{
				...props,
				createdAt: new Date(),
			},
			id
		);

		return client;
	}
}
