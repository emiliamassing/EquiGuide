import { IHorseData } from "../models/IHorseData";
import { get, post } from "./serviceBase";

const BASEURL = import.meta.env.VITE_API_URL;

export async function getAllHorses() {
    const response = await get<IHorseData[]>(BASEURL + 'horses');
    return response;
}

export async function getHorses(query: string) {
    const response = await get<IHorseData[]>(BASEURL + 'horses/user?userId=' + query);
    return response;
}

export async function addHorse(data: object) {
    const response = await post(BASEURL + 'horses/add', data);
    return response;
}