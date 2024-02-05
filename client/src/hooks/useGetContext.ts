import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useCookies } from "react-cookie";
import { ActionTypes } from "../types/ActionTypes";

export function useGetContext() {
    const { userData, dispatch } = useContext(UserContext);
    const [cookies] = useCookies(['user']);

    useEffect(() => {

        async function fetchUserData() {
            dispatch({ type: ActionTypes.UPDATE_CONTEXT, payload: JSON.stringify(cookies.user) });
        }

        if (userData.length === 0) {
            fetchUserData();
        }
    }, [userData, cookies.user, dispatch]);
}
