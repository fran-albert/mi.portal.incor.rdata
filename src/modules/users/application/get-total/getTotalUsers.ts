import { UserRepository } from "../../domain/UserRepository";

export function getTotalUsers(userRepository: UserRepository) {
  return async (): Promise<number> => {
    return await userRepository.getTotalUsers();
  };
}
