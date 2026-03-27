export declare enum UserRole {
    ADMIN = "ADMIN",
    CSKH = "CSKH",
    TECH = "TECH",
    MANAGER = "MANAGER"
}
export declare class CreateUserDto {
    email: string;
    full_name: string;
    password_hash?: string;
    role?: UserRole;
}
export declare class UpdateUserDto {
    full_name?: string;
    role?: UserRole;
    is_active?: boolean;
}
