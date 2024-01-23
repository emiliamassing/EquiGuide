export interface IUserData {
    message: string,
    user: {
        email: string,
        id: number,
        firstname: string,
        lastname: string
    };
    token: string;
}