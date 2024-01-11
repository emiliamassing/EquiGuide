import axios, { AxiosResponse } from "axios";

export async function get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.get<T>(url);
    return response.data;
}

export async function post<T>(url: string, data: object): Promise<T> {
    const response: AxiosResponse<T> = await axios.post<T>(url, data);
    return response.data;
}