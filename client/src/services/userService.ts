import { IUpdatedUser } from "../models/IUpdatedUser";
import { IUserData } from "../models/IUserData";
import { get, post } from "./serviceBase";

const BASEURL = import.meta.env.VITE_API_URL;

export async function addUser(data: object) {
    const response = await post(BASEURL + 'users/add', data);
    return response;
}

export async function loginUser(data: object) {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await post<IUserData>(BASEURL + 'users/login', data);
        return response;
    } catch(error) {
        throw error;
    }
}

export async function getUserById(query: string): Promise<IUpdatedUser[]> {
    const response = await get<IUpdatedUser[]>(BASEURL + `users/${query}`);
    return response;
}

export async function editUser(data: object, id: number) {
    const response = await post(BASEURL + `users/edit/${id}`, data);
    return response;
}

export function addUserToLocalStorage(token: string) {
    localStorage.setItem('token', token);
}

export function removeFromLocalStorage() {
    localStorage.removeItem('token');
}