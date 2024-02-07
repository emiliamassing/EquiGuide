import { Dispatch, createContext } from "react";
import { IUserData } from "../models/IUserData";
import { IUserAction } from "../reducer/UserReducer";

export interface IUserContext {
    userData: IUserData[];
    dispatch: Dispatch<IUserAction>;
}

export const UserContext = createContext<IUserContext>({
    userData: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: () => {},
});