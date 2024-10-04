import { createContext, Dispatch } from "react";
import { IHorseData } from "../models/IHorseData";
import { IHorseAction } from "../reducer/HorseReducer";

export interface IHorseContext {
    horseData: IHorseData[];
    horseDispatch: Dispatch<IHorseAction>
}

export const HorseContext = createContext<IHorseContext>({
    horseData: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    horseDispatch: () => {}
});