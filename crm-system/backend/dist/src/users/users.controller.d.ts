import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        password_hash: string;
        full_name: string;
        role: import("@prisma/client").$Enums.UserRole;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        created_by_id: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        full_name: string;
        role: import("@prisma/client").$Enums.UserRole;
        created_at: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        password_hash: string;
        full_name: string;
        role: import("@prisma/client").$Enums.UserRole;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        created_by_id: string | null;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        password_hash: string;
        full_name: string;
        role: import("@prisma/client").$Enums.UserRole;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        created_by_id: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        email: string;
        password_hash: string;
        full_name: string;
        role: import("@prisma/client").$Enums.UserRole;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        created_by_id: string | null;
    }>;
}
