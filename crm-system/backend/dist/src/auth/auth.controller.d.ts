import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express';
interface LoginDto {
    email: string;
    password: string;
}
interface AuthenticatedRequest extends ExpressRequest {
    user: {
        userId: string;
        email: string;
        role: string;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.UserRole;
        };
    }>;
    getProfile(req: AuthenticatedRequest): AuthenticatedRequest['user'];
}
export {};
