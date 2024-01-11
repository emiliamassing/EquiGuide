import { post } from "./serviceBase";

const BASEURL = import.meta.env.VITE_API_URL;

export async function createUser(data: object) {
    const response = await post(BASEURL, data);
    return response;
}

export async function loginUser(endpoint: string, data: object) {
    const response = await post(BASEURL + endpoint, data);
    return response;
}