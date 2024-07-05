import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export function updateUser(patientRepository: UserRepository) {
    return async (updateUser: User, id: number): Promise<User | undefined> => {
        return await patientRepository.updateUser(updateUser, id);
    };
}
