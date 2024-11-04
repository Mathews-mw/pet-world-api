import { Entity } from '@/core/entities/entity';

export const animalType = ['DOG', 'CAT'] as const;
export const schedulingStatus = ['SCHEDULED', 'IN_PROGRESS', 'CANCELED', 'COMPLETED'] as const;

export type IPetType = (typeof animalType)[number];
export type ISchedulingStatus = (typeof schedulingStatus)[number];

export interface ISchedulingProps {
	owner: string;
	petName: string;
	petType: IPetType;
	ownerPhone: string;
	serviceDescription: string;
	status: ISchedulingStatus;
	date: Date;
}

export class Scheduling extends Entity<ISchedulingProps> {
	get owner() {
		return this.props.owner;
	}

	set owner(owner: string) {
		this.props.owner = owner;
	}

	get petName() {
		return this.props.petName;
	}

	set petName(petName: string) {
		this.props.petName = petName;
	}

	get petType() {
		return this.props.petType;
	}

	set petType(petType: IPetType) {
		this.props.petType = petType;
	}

	get ownerPhone() {
		return this.props.ownerPhone;
	}

	set ownerPhone(ownerPhone: string) {
		this.props.ownerPhone = ownerPhone;
	}

	get serviceDescription() {
		return this.props.serviceDescription;
	}

	set serviceDescription(serviceDescription: string) {
		this.props.serviceDescription = serviceDescription;
	}

	get status() {
		return this.props.status;
	}

	set status(status: ISchedulingStatus) {
		this.props.status = status;
	}

	get date() {
		return this.props.date;
	}

	set date(date: Date) {
		this.props.date = date;
	}
}
