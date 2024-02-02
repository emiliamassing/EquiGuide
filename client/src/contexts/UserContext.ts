import { createContext } from "react";
import { IUserData } from "../models/IUserData";

export const UserContext = createContext<IUserData[]>([]);