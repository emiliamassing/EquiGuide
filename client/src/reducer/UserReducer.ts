import { IUserData } from "../models/IUserData";
import { ActionTypes } from "../types/ActionTypes";

export interface IUserAction {
    type: ActionTypes,
    payload: string
}

export function UserReducer(userdata: IUserData[], action: IUserAction) {
    switch(action.type) {
        case ActionTypes.LOGIN: {
            const userValues = JSON.parse(action.payload);

            return [...userdata, userValues];
        }
        case ActionTypes.LOGOUT: {
            return [...userdata.filter((user) => user.user.id !== +action.payload)];
        }
        case ActionTypes.UPDATE_CONTEXT: {
            const userValues = JSON.parse(action.payload);

            return {
                ...userdata,
                user: {
                    email: userValues.email,
                    id: userValues.id,
                    firstname: userValues.first_name,
                    lastname: userValues.last_name
                }
            };
        }

        default: {
           break;
        }
    }

    return userdata;
}