import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export const animalType = ['DOG', 'CAT'] as const;
export const schedulingStatus = ['SCHEDULED', 'IN_PROGRESS', 'CANCELED', 'COMPLETED'] as const;

export type IPetType = (typeof animalType)[number];
export type ISchedulingStatus = (typeof schedulingStatus)[number];

export interface ISchedulingProps {
	clientId: UniqueEntityId;
	petName: string;
	petType: IPetType;
	clientPhone: string;
	serviceCod: string;
	description?: string | null;
	status: ISchedulingStatus;
	date: Date;
	registerAt: Date;
	updatedAt?: Date | null;
}

export class Scheduling extends Entity<ISchedulingProps> {
	get clientId() {
		return this.props.clientId;
	}

	get petName() {
		return this.props.petName;
	}

	set petName(petName: string) {
		this.props.petName = petName;
		this.touch();
	}

	get petType() {
		return this.props.petType;
	}

	set petType(petType: IPetType) {
		this.props.petType = petType;
		this.touch();
	}

	get clientPhone() {
		return this.props.clientPhone;
	}

	set clientPhone(clientPhone: string) {
		this.props.clientPhone = clientPhone;
		this.touch();
	}

	get serviceCod() {
		return this.props.serviceCod;
	}

	set serviceCod(serviceCod: string) {
		this.props.serviceCod = serviceCod;
		this.touch();
	}

	get description(): string | null | undefined {
		return this.props.description;
	}

	set description(description: string | null | undefined) {
		this.props.description = description;
		this.touch();
	}

	get status() {
		return this.props.status;
	}

	set status(status: ISchedulingStatus) {
		this.props.status = status;
		this.touch();
	}

	get date() {
		return this.props.date;
	}

	set date(date: Date) {
		this.props.date = date;
		this.touch();
	}

	get registerAt() {
		return this.props.registerAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	static create(
		props: Optional<ISchedulingProps, 'description' | 'registerAt' | 'updatedAt'>,
		id?: UniqueEntityId
	) {
		const scheduling = new Scheduling(
			{
				...props,
				registerAt: new Date(),
			},
			id
		);

		return scheduling;
	}
}
