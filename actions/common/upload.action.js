import { test } from '@playwright/test';

export class UploadAction {
  constructor(page) {
    this.page = page;
  }

  /**
   * Uploads a file using the file input field.
   *
   * This method locates the file upload input element
   * and sets the provided file path for upload.
   *
   * @param {string} filePath - The full path of the file to be uploaded.
   */
  async uploadFile(filePath) {
    await test.step(`Upload file: ${filePath}`, async () => {
      const fileInput = this.page.getByLabel('', { exact: true });
      await fileInput.setInputFiles(filePath);
    });
  }
}

