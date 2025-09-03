import axios from "axios";
import type { User } from "../types/user.type";
const URL = "https://68b886ddb715405043287a6f.mockapi.io/";
const GIT_URL = "https://api.github.com"

async function getUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(`${URL}data`);

  return response.data;
}

async function updateUserName(userId: string, name: string): Promise<User> {
  const response = await axios.put<User>(`${URL}data/${userId}`, { name });

  return response.data;
}

async function deleteUser(userId: string): Promise<User> {
  const response = await axios.delete<User>(`${URL}data/${userId}`);

  return response.data;
}

async function getUserDetails(userName: string): Promise<any> {
  const response = await axios.get<any>(`${GIT_URL}/users/${userName}`);

  return response.data;
}

export const api = {
  getUsers,
  getUserDetails,
  updateUserName,
  deleteUser,
};