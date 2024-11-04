import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IServiceProps {
	cod: string;
	name: string;
	description: string;
	available: boolean;
}

export class Service extends Entity<IServiceProps> {
	get cod() {
		return this.props.cod;
	}

	get name() {
		return this.props.name;
	}

	set name(name: string) {
		this.props.name = name;
	}

	get description() {
		return this.props.description;
	}

	set description(description: string) {
		this.props.description = description;
	}

	get available() {
		return this.props.available;
	}

	set available(available: boolean) {
		this.props.available = available;
	}

	static create(props: Optional<IServiceProps, 'available'>, id?: UniqueEntityId) {
		return new Service(
			{
				...props,
				available: props.available ?? true,
			},
			id
		);
	}
}
