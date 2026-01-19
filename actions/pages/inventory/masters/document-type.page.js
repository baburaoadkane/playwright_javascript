export class DocumentTypePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.expiryNotificationInput = page
      .getByLabel('Expiry Notification Before Days')
      .or(page.getByRole('textbox', { name: /expirynotificationbeforedays/i }));
    this.applicableCompaniesSelect = page.locator('[name="DocumentType.CompanyIds"]');
    // If it's a multi-select dropdown, you might also want:
    // this.companyOption = (companyName) => page.getByRole('option', { name: companyName });
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
  async selectCompanies(companyNames) {

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
    }
  }
}