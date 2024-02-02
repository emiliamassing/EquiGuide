import { Dispatch, createContext } from "react";
import { IUserAction } from "../reducer/userReducer";

export const UserDispatchContext = createContext<Dispatch<IUserAction>>(() => {
    return;
});