// NOTE:
// This page handles ONLY Document Type-specific fields.
// Common master header fields are handled by app.header.

export class DocumentTypePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.expiryNotificationInput = page
      .getByLabel('Expiry Notification Before Days')
      .or(page.getByRole('textbox', { name: /expirynotificationbeforedays/i }));
    this.applicableCompaniesSelect = page.locator('[name="DocumentType.CompanyIds"]');
  }

  /**
   * Fills the expiry notification days input field
   * @param {string} value - Number of days (as string)
   */
  async fillExpiryNotificationBeforeDays(value) {
    await this.expiryNotificationInput.fill(value);
  }

  /**
   * Opens/clicks the applicable companies multi-select field
   */
  async openApplicableCompaniesDropdown() {
    await this.applicableCompaniesSelect.click();
  }

  /**
   * Selects one or multiple companies in the dropdown
   * @param {string|string[]} companyNames 
   */
  async selectApplicableCompanies(companyNames) {

    if (!companyNames || (Array.isArray(companyNames) && companyNames.length === 0)) {
      return;
    }
    
    const names = Array.isArray(companyNames) ? companyNames : [companyNames];

    await this.openApplicableCompaniesDropdown();

    for (const name of names) {
      const item = this.page.locator('tr.dxeListBoxItemRow_Office365')
        .filter({ hasText: name })
        .first();

        // Ensure the item is visible before clicking
        await item.waitFor({ state: 'visible', timeout: 3000 });
        await item.click();
        await this.page.waitForTimeout(500);
    }
  }
}