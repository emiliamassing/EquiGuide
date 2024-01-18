import { post } from "./serviceBase";

const BASEURL = import.meta.env.VITE_API_URL;

export async function addHorse(data: object) {
    const response = await post(BASEURL + 'horses/add', data);
    return response
}