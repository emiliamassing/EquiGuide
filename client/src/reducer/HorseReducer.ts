import { IHorseData } from "../models/IHorseData";
import { HorseActionTypes } from "../types/ActionTypes";

export interface IHorseAction {
    type: HorseActionTypes,
    payload: string
}

export function HorseReducer(horseData: IHorseData[], action: IHorseAction) {
    switch(action.type) {
        case HorseActionTypes.PASS_DATA: {
            const horseValues= JSON.parse(action.payload);

            return [horseValues];
        }

        default: {
            break;
        }
    }

    return horseData;
}