import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOneByEmail(email: string): Promise<{
        id: string;
        email: string;
        password_hash: string;
        full_name: string;
        role: import("@prisma/client").$Enums.UserRole;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        created_by_id: string | null;
    } | null>;
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
