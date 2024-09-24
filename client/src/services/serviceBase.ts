import axios, { AxiosError, AxiosResponse } from "axios";

export async function get<T>(url: string, params?: Record<string, string | number>): Promise<T> {
    const response: AxiosResponse<T> = await axios.get<T>(url, {params});
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

export function compareDates(dateA: Date, dateB: Date) {
    return dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate();
}

export function compareUpcomingDates(dateA: Date, dateB: Date) {
    return dateA.getFullYear() === dateB.getFullYear() &&
    (dateA.getMonth() < dateB.getMonth() || 
    (dateA.getMonth() === dateB.getMonth() && dateA.getDate() <= dateB.getDate()));
}

export function comparePassedDates(dateA: Date, dateB: Date) {
    return dateA.getFullYear() === dateB.getFullYear() &&
    (dateA.getMonth() > dateB.getMonth() || 
    (dateA.getMonth() === dateB.getMonth() && dateA.getDate() > dateB.getDate()));
}