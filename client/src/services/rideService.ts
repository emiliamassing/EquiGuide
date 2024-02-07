import { IRideData } from "../models/IRideData";
import { get, post } from "./serviceBase";

const BASEURL = import.meta.env.VITE_API_URL;

export async function getRidesByUserId(query: string) {
    const response = await get<IRideData[]>(BASEURL + 'ridingSessions/user?userId=' + query);
    return response;
}

export async function getRidesByHorseId(query: string) {
    const response = await get<IRideData[]>(BASEURL + 'ridingSessions/user?horseId=' + query);
    return response;
}

export async function addRide(data: object) {
    const response = await post(BASEURL + 'ridingSessions/add', data);
    return response;
}

