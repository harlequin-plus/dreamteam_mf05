export declare type TUser = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    phone: string;
    login: string;
    avatar: string | null;
    email: string;
};
export declare class SsrYandexAPIUserRepository {
    private _cookieHeader;
    constructor(_cookieHeader: string | undefined);
    getCurrent(): Promise<TUser>;
}
