import axiosInstance from "@/services/axiosConfig";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import axios from "axios";

export function createApiUserRepository(): UserRepository {
  async function getUser(id: number): Promise<User | undefined> {
    const response = await axiosInstance.get(`Account/user?id=${id}`);
    const user = response.data as User;
    return user;
  }

  async function getAllUsers(): Promise<User[]> {
    const response = await axiosInstance.get(`account/all`);
    const users = response.data as User[];
    return users;
  }

  async function requestSupport(request: User): Promise<void> {
    const response = await axiosInstance.post(`account/support`, request);
    const users = response.data;
    return users;
  }

  async function getTotalUsers(): Promise<number> {
    const response = await axiosInstance.get(`account/all`);
    const user = response.data as User[];
    const totalUser = user.length;
    return totalUser;
  }

  async function changePassword(
    data: User
  ): Promise<User | undefined> {
    const response = await axiosInstance.post(
      `account/change/password`,
      data
    );
    const user = response.data as User;
    return user;
  }

  async function forgotPassword(email: string): Promise<void> {
    const response = await axiosInstance.post(
      `Account/forgot/password?email=${email}`,
      email
    );
    const user = response.data;
    return user;
  }
  async function resetPassword(data: any): Promise<User | undefined> {
    const response = await axiosInstance.post(
      `account/reset/password`,
      data
    );
    const user = response.data;
    return user;
  }
  async function updateUser(data: User, id: number): Promise<User | undefined> {
    const response = await axiosInstance.put(
      `account/${id}`,
      data
    );
    const user = response.data;
    return user;
  }

  return {
    getUser, forgotPassword, updateUser,
    changePassword, resetPassword,
    getTotalUsers, requestSupport,
    getAllUsers,
  };
}
