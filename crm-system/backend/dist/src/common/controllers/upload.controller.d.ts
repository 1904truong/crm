import { FileUploadService } from '../services/file-upload.service';
export declare class UploadController {
    private fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadCustomerAvatar(file: Express.Multer.File): Promise<{
        filepath: string;
    }>;
    uploadProductImage(file: Express.Multer.File): Promise<{
        filepath: string;
    }>;
}
