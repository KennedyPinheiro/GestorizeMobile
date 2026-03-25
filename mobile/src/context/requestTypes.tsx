import { UserType } from "src/context/types";

export type LoginData = {
    token: string;
    user: UserType;
};


export type RefreshData = {
    token: string;
    user: UserType;
};

