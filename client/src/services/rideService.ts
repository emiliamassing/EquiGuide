import { post } from "./serviceBase";

const BASEURL = import.meta.env.VITE_API_URL;

export async function addRide(data: object) {
    const response = await post(BASEURL + 'ridingSessions/add', data);
    return response;
}