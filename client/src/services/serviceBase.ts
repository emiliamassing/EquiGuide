import axios, { AxiosError, AxiosResponse } from "axios";

export async function get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.get<T>(url);
    return response.data;
}

export async function post<T>(url: string, data: object): Promise<T> {
    const response: AxiosResponse<T> = await axios.post<T>(url, data);
    return response.data;
}

export function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

export function capitalizeWords(words: string[]): string[] {
    return words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
}