import { IUserData } from "../models/IUserData";
import { post } from "./serviceBase";

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

export function addUserToLocalStorage(user: object, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
}

export function removeFromLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}