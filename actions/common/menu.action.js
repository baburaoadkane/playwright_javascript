import { test } from '@playwright/test';

export class MenuAction {
  constructor(page) {
    this.page = page;
  }

  /**
   * Selects a module from the module switcher.
   *
   * This method clicks on the "Change module" control
   * and selects the specified module by its name.
   *
   * @param {string} option - Name of the module to select.
   */
  async selectModule(moduleName) {
    await test.step(`Select module: ${moduleName}`, async () => {
      await this.page.getByTitle('Change module').click();
      await this.page.getByRole('link', { name: moduleName, exact: true }).click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Clicks a menu option using exact visible text.
   *
   * This method is useful when the menu option
   * is identified strictly by its displayed text.
   *
   * @param {string} option - Exact text of the menu option to click.
   */
  async clickMenuOptionByText(option) {
    await test.step(`Click menu option by text: ${option}`, async () => {
      await this.page.getByText(option, { exact: true }).click();
      await this.page.waitForTimeout(1000);
    });
  }

  /**
   * Clicks an option from the left-side menu.
   *
   * This method locates the left menu item using
   * its title attribute and performs a click action.
   *
   * @param {string} option - Name of the left menu option to click.
   */
  async clickLeftMenuOption(option) {
    await test.step(`Click left menu option: ${option}`, async () => {
      await this.page.getByTitle(option, { exact: true }).click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Clicks an option from the top master/transaction toolbar.
   *
   * This method locates the toolbar button using
   * visible text and clicks the first matching option.
   *
   * @param {string} option - Name of the master/transaction toolbar option.
   */
  async clickTopMenuOption(option) {
    await test.step(`Click top menu option: ${option}`, async () => {
      const optionButton = this.page
        .locator('div.dxm-hasText', { hasText: option })
        .first();

      await optionButton.waitFor({ state: 'visible' });
      await optionButton.click();
      await this.page.waitForTimeout(1000);
    });
  }

  /**
   * Clicks an option from the listing toolbar.
   *
   * @param {string} option
   * @param {number} [index=0]
   */
  async clickListingMenuOption(option, index = 0) {
    await test.step(`Click listing toolbar option: ${option} [${index}]`, async () => {
      const menuItem = this.page.locator(`li[title="${option}"]`).nth(index);
      await menuItem.waitFor({ state: 'visible' });
      await menuItem.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Navigate back to listing by clicking form title.
   */
  async navigateBackToListingByTitle(formTitle) {
    await test.step(`Navigate back to listing: ${formTitle}`, async () => {
      await this.page.getByRole('link', { name: formTitle, exact: true }).click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Closes the current form.
   */
  async clickCloseForm() {
    await test.step('Close form', async () => {
      await this.page.getByRole('listitem', { name: 'Close form' }).click();
      await this.page.waitForLoadState('networkidle');
    });
  }
}
