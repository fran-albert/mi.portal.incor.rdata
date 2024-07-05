import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export function resetPassword(userRepository: UserRepository) {
  return async (data: any): Promise<User | undefined> => {
    return await userRepository.resetPassword(data);
  };
}
