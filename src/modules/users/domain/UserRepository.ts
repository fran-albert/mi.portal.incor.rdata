import { User } from './User';

export interface UserRepository {
	getUser: (id: number) => Promise<User | undefined>;
	getAllUsers: () => Promise<User[]>;
	getTotalUsers: () => Promise<number>;
	requestSupport: (request: User) => Promise<void>;
	changePassword: (data: User) => Promise<User | undefined>;
	resetPassword: (data: any) => Promise<User | undefined>;
	forgotPassword: (data: string) => Promise<void>;
	updateUser: (data: User, id: number) => Promise<User | undefined>;
}