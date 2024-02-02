import { IUserData } from "../models/IUserData";

export interface IUserAction {
    type: string,
    payload: string
}

export function UserReducer(userdata: IUserData[], action: IUserAction) {
    switch(action.type) {

        default: return userdata;
    }
}