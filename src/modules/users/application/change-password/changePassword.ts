import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export function changePassword(userRepository: UserRepository) {
  return async (data: User): Promise<User | undefined> => {
    return await userRepository.changePassword(data);
  };
}
