import { PaginationDto } from '../../common/dtos';
export declare class CustomerQueryDto extends PaginationDto {
    customer_type?: string;
    is_active?: boolean;
}
