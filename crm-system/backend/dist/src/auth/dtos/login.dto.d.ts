export declare class LoginDto {
    email: string;
    password: string;
}
export declare class LoginResponseDto {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        email: string;
        full_name: string;
        role: string;
    };
}
