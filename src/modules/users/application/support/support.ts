import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export function requestSupport(userRepository: UserRepository) {
    return async (request: User): Promise<void> => {
        return await userRepository.requestSupport(request);
    };
}
