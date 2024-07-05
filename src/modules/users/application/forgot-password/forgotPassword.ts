import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export function forgotPassword(userRepository: UserRepository) {
    return async (data: string): Promise<void> => {
        return await userRepository.forgotPassword(data);
    };
}
