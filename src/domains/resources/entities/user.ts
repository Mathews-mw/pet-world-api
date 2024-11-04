import { Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export const userRoleTypes = ['EMPLOYEE', 'ADMIN'] as const;

export type UserRoleType = (typeof userRoleTypes)[number];

export interface IUserProps {
	name: string;
	email: string;
	password: string;
	userRole: UserRoleType;
	active: boolean;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class User extends Entity<IUserProps> {
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

	get userRole() {
		return this.props.userRole;
	}

	set userRole(userRole: UserRoleType) {
		this.props.userRole = userRole;
		this.touch();
	}

	get active() {
		return this.props.active;
	}

	set active(active: boolean) {
		this.props.active = active;
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

	static create(
		props: Optional<IUserProps, 'createdAt' | 'active' | 'userRole' | 'updatedAt'>,
		id?: UniqueEntityId
	) {
		const user = new User(
			{
				...props,
				createdAt: new Date(),
				userRole: props.userRole ?? 'EMPLOYEE',
				active: props.active ?? true,
			},
			id
		);

		return user;
	}
}
