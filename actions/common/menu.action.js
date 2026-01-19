import { test } from '@playwright/test';

export class MenuAction {
  constructor(page) {
    this.page = page;

    this.formTitle = page.getByRole("link", { name: "Payment Term", exact: true });
  }

  /**
   * Selects a module from the module switcher.
   *
   * This method clicks on the "Change module" control
   * and selects the specified module by its name.
   *
   * @param {string} option - Name of the module to select.
   */
  async selectModule(option) {
    await test.step(`Select module: ${option}`, async () => {
      await this.page.getByTitle('Change module').click();
      await this.page.getByRole('link', { name: option, exact: true }).click();
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
    await test.step(`Click on left menu option: ${option}`, async () => {
      await this.page.getByTitle(option, { exact: true }).click();
    });
  }

  /**
   * Clicks an option from the listing toolbar.
   *
   * This method clicks a toolbar option present
   * on the listing page based on its title.
   *
   * @param {string} option - Name of the listing toolbar option.
   */
  async clickListingMenuOptionByTitle(option) {
    await test.step(`Click listing toolbar option: ${option}`, async () => {
      await this.page.locator(`li[title="${option}"]`).click();
      await this.page.waitForTimeout(2000);
    });
  }

  /**
   * Clicks an option from the listing toolbar with index.
   *
   * This method clicks a toolbar option present
   * on the listing page based on its title with index.
   *
   * @param {string} option - Name of the listing toolbar option.
   */
  async clickListingMenuOptionAtIndex(option, index) {
    await test.step(`Click listing toolbar option: ${option} at index ${index}`, async () => {
      const menuItem = this.page.locator(`li[title="${option}"]`).nth(index);
      await menuItem.waitFor({ state: 'visible' });
      await menuItem.click();

      // Wait for action to complete (better than fixed timeout)
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

      await optionButton.click();
      await this.page.waitForTimeout(1000);
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

  /** Navigate to the listing by clicking on the form title hyperlink */
  async navigateBackToListingByTitle(formTitle) {
    await this.page.getByRole("link", { name: formTitle, exact: true }).click();
    await this.page.waitForLoadState('networkidle');
  }

  //** click on close form */
  async clickCloseForm() {
    await this.page.getByRole('listitem', { name: 'Close form' }).click();
    await this.page.waitForLoadState('networkidle');
  }
}
