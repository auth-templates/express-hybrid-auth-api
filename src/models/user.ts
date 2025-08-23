export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;
	createdAt: Date;
	enabled2FA?: boolean;
	termsAccepted?: boolean;
	status?: UserStatus;
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt'> & { password: string };
export type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt'>>;

export interface UserCredentials {
	email: string;
	password: string;
}

export enum Role {
	Employee = 'employee',
	Manager = 'manager',
	Admin = 'admin',
}

export enum UserStatus {
	Pending = 'pending',
	Active = 'active',
	Suspended = 'suspended',
	Deactivated = 'deactivated',
	Deleted = 'deleted',
}
