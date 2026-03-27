export declare class FileUploadService {
    private readonly uploadDir;
    constructor();
    private ensureUploadDir;
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    deleteFile(filepath: string): Promise<void>;
}
