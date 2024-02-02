import { IUserData } from "../models/IUserData";

export interface IUserAction {
    type: string,
    payload: string
}

export function UserReducer(userdata: IUserData[], action: IUserAction) {
    switch(action.type) {
        case 'login': {
            const userValues = JSON.parse(action.payload);

            return [...userdata, userValues];
        }
        case 'logout': {
            return [...userdata.filter((user) => user.user.id !== +action.payload)];
        }

        default: {
           break;
        }
    }

    return userdata;
}