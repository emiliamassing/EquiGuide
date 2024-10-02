import { IRideData } from "../models/IRideData";
import { RideActionTypes } from "../types/ActionTypes";

export interface IRideAction {
    type: RideActionTypes,
    payload: string
}

export function RideReducer(rideData: IRideData[], action: IRideAction) {
    switch(action.type) {
        case RideActionTypes.PASS_DATA: {
            const rideValues = JSON.parse(action.payload);
            
            return [rideValues];
        }

        default: {
            break;
        }
    }

    return rideData;
}