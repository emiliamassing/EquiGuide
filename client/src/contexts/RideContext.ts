import { createContext, Dispatch } from "react";
import { IRideData } from "../models/IRideData";
import { IRideAction } from "../reducer/RideReducer";

export interface IRideContext {
    rideData: IRideData[];
    rideDispatch: Dispatch<IRideAction>;
}

export const RideContext = createContext<IRideContext>({
    rideData: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    rideDispatch: () => {},
});