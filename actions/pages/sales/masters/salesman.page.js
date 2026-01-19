export class SalesmanPage {
  constructor(page) {
    this.page = page;
    this.salesman = page.getByRole("link", { name: "Salesman", exact: true });
    this.otherGird = page.locator('#Other_HC');
    this.type = page.getByLabel("Type");
    this.salesCommissionInPercent = page.getByLabel("Sales Commission In Percent");
    this.title = page.getByLabel("Title");
    this.email = page.getByLabel("Email");
    this.extension = page.getByLabel("Extension");
    this.mobile = page.getByLabel("Mobile");
  }

  async clickOnSalesman() {
    await this.salesman.click();
  }

  async clickOnOtherGird() {
    await this.otherGird.click();
  }

  async clickOnType() {
    await this.type.click();
  }

  async fillSalesCommissionInPercent(value) {
    var salesCommissionInPercent = this.salesCommissionInPercent;
    salesCommissionInPercent.clear();
    await this.salesCommissionInPercent.fill(String(value));
  }

  async fillTitle(value) {
    await this.title.fill(value);
  }

  async fillEmail(value) {
    await this.email.fill(value);
  }

  async fillExtension(value) {
    await this.extension.fill(value);
  }

  async fillMobile(value) {
    await this.mobile.fill(value);
  }

}