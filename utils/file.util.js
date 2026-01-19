import path from 'path';
import fs from 'fs';

export class FileHelper {

    /**
     * Get file path from imports folder
     * @param {string} folder - Subfolder name (e.g., 'sales', 'purchase')
     * @param {string} fileName - File name without extension
     * @param {string} fileExtension - File extension (default: '.xlsx')
     * @returns {string} - Absolute file path
     * @throws {Error} - If file doesn't exist
     */
    static getUploadFile(folder, fileName, fileExtension = '.xlsx') {

        if (!folder || !fileName) {
            throw new Error('Folder and fileName are required');
        }
        
        const filePath = path.join(process.cwd(), 'imports', folder, `${fileName}${fileExtension}`);

        if (!fs.existsSync(filePath)) {
            throw new Error(
                `Upload file not found.\nFolder: ${folder}\nFile  : ${fileName}${fileExtension}`
            );
        }

        return filePath;
    }

}