export interface IRideData {
    id: number,
    title: string,
    date: Date,
    discipline: string,
    notes: string,
    rating: number,
    horse_name: string,
    ride_id?: number
}