import { post } from "./serviceBase";

const BASEURL = import.meta.env.VITE_API_URL;

export async function createUser(data: object) {
    const response = await post(BASEURL + 'users/add', data);
    return response;
}

export async function loginUser(data: object) {
    const response = await post(BASEURL + 'users/login', data);
    return response;
}