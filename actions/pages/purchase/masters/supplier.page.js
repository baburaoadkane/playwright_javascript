import { test } from '@playwright/test';
import { LookupAction } from '../../components/lookup.action';

export class SupplierPage {
    constructor(page) {
        this.page = page;

        this.lookup = new LookupAction(page);

        /* ================= TAX DETAILS ================= */
        this.country = page.locator("input[id*='CountryId']");
        this.state = page.locator("input[id*='CountryStateId']");
        this.taxTreatment = page.locator("input[id*='TaxTreatment']");
        this.taxRegistrationNumber = page.locator("input[id*='TaxRegistrationNumber']");
        this.back = page.locator('#pre-Button');
        this.cancel = page.locator('.dx-clear-button-area');

        /* ================= TABS ================= */
        this.keyInfoTab = page.getByRole('tab', { name: 'Key Info' });
        this.contactPersonTab = page.getByRole('tab', { name: 'Contact Persons' });
        this.addressTab = page.getByRole('tab', { name: 'Addresses' });
        this.itemsTab = page.getByRole('tab', { name: 'Items' });
        this.documentsTab = page.getByRole('tab', { name: 'Documents' });

        /* ================= KEY INFO ================= */
        this.currency = page.locator("input[id*='CurrencyId']");
        this.group = page.locator("input[id*='SupplierGroupId']");
        this.email = page.locator("input[id*='Email']");
        this.mobile = page.locator("input[id*='Mobile']");
        this.telNumber = page.locator("input[id*='TelNumber']");
        this.faxNumber = page.locator("input[id*='faxNumber']");
        this.keyInfoEmail = page.locator("input[name='ContactPersonEmail']");
        this.keyInfoMobile = page.locator("input[id*='ContactPersonMobile']");
        this.contactPerson = page.locator("input[id*='ContactPersonName']");
        this.restrictPaymentTerm = page.locator('#SupplierRestrictPaymentTermCheck');
        this.selectPaymentTermField = page.getByPlaceholder('Select payment term...');
        this.selectAllPaymentTerm = page.getByRole('checkbox', { name: 'Select All' });
        this.payableMainAccount = page.locator("input[id*='PayableMainAccountId']");
        this.description = page.locator("textarea[name='Description']");
        this.saveKeyInformation = page.locator('#InfoSave');

        /* ================= CREDIT CONTROL ================= */
        this.enableCreditControl = page.locator('#EnableCreditControl');
        this.creditLimitAmount = page.getByLabel(/Credit Limit Amount/i);
        this.creditLimitDays = page.getByLabel(/Credit Limit Days/i);

        /* ================= DEFAULTS ================= */
        this.setDefaults = page.locator('#EnableDefaults');
        this.paymentTerm = page.getByLabel(/Payment Term/i);
        this.shippingTerm = page.getByLabel(/Shipping Term/i);
        this.loadingPort = page.getByLabel(/Loading Port/i);
        this.destinationPort = page.getByLabel(/Destination Port/i);
        this.shippingMethod = page.getByLabel(/Shipping Method/i);
        this.shipmentPriority = page.getByLabel(/Shipment Priority/i);

        /* ================= ADDRESS ================= */
        this.addAddress = page.getByRole('button', { name: 'Add Address', exact: true });
        this.addressDescription = page.locator("input[id*='Description']");
        this.address1 = page.locator("input[id*='Address1']");
        this.address2 = page.locator("input[id*='Address2']");
        this.address3 = page.locator("input[id*='Address3']");
        this.address4 = page.locator("input[id*='Address4']");
        this.address5 = page.locator("input[id*='Address5']");
        this.city = page.locator("input[id*='City']");
        this.addressState = page.locator("input[id*='State']");
        this.dialingCode = page.locator("input[id*='CountryCode']");
        this.zipCode = page.locator("input[id*='Zipcode']");
        this.addressContactPerson = page. getByRole('textbox', { name: 'Contact Person:' });
        this.addressEmail = page.locator("input[id*='Email']");
        this.addressMobileNumber = page.getByLabel("Mobile Number");
        this.addressTelNumber = page.getByLabel("Tel Number");
        this.addressFaxNumber = page.getByLabel("Fax Number");
        this.addressDefault = page.locator("div[id*='Default']").nth(1);
        this.addressFreezed = page.locator("div[id*='Freezed']");

        /* ================= CONTACT PERSON ================= */
        this.addContactPerson = page.getByRole('button', { name: 'Add Contact Person', exact: true });
        this.prefix = page.locator("input[id*='Prefix']");
        this.firstName = page.getByRole('textbox', { name: 'First Name:', exact: true });
        this.middleName = page.getByRole('textbox', { name: 'Middle Name:', exact: true });
        this.lastName = page.getByRole('textbox', { name: 'Last Name:', exact: true });
        this.jobTitle = page.getByRole('textbox', { name: 'Job Title:', exact: true });
        this.gender = page.getByRole('combobox', { name: 'Gender:', exact: true });
        this.contactPersonMobileNumber = page.getByLabel('Mobile #:');
        this.contactPersonTelephoneNumber = page.getByLabel('Telephone #:');
        this.contactPersonFaxNumber = page.getByLabel('Fax #:');
        this.contactPersonEmail = page.getByLabel('Email:');
        this.contactPersonDefault = page.locator("div[id*='Default']").nth(1);
        this.contactPersonfreezed = page.locator("div[id*='Freezed']");
        this.saveContactPerson = page.getByRole('button', { name: 'Save', exact: true });
        this.personDefault = page.locator("div[id*='Default']").nth(2);
        this.personFreezed = page.locator("div[id*='Freezed']");

        /* ================= ITEMS ================= */
        this.addItem = page.getByRole('button', { name: 'Add Item', exact: true });
        this.item = page.locator("input[id*='ItemId']");

         /* ================= ITEMS ================= */
        this.addDocument = page.getByRole('button', { name: 'Add Document', exact: true });
    }

    /* ================= TAX DETAILS ACTIONS ================= */

    /** Clicks Country lookup */
    async clickCountry() {
        await test.step('Click Country field', async () => {
            await this.country.click();
        });
    }

    /** Clicks State lookup */
    async clickState() {
        await test.step('Click State field', async () => {
            await this.state.click();
        });
    }

    /** Clicks Tax Treatment */
    async clickTaxTreatment() {
        await test.step('Click Tax Treatment', async () => {
            await this.taxTreatment.click();
        });
    }

    /** Fills Tax Registration Number */
    async fillTaxRegistrationNumber(value) {
        await test.step(`Fill Tax Registration Number: ${value}`, async () => {
            await this.taxRegistrationNumber.fill(value);
        });
    }

    /* ================= NAVIGATION ================= */

    /** Clicks Back button */
    async clickBack() {
        await test.step('Click Back button', async () => {
            await this.back.click();
        });
    }

    /** Clicks Cancel button */
    async clickCancel() {
        await test.step('Click Cancel button', async () => {
            await this.cancel.click();
        });
    }

    /* ================= TAB NAVIGATION ================= */

    async openKeyInfoTab() {
        await test.step('Open Key Info tab', async () => {
            await this.keyInfoTab.click();
        });
    }

    async openContactPersonTab() {
        await test.step('Open Contact Person tab', async () => {
            await this.contactPersonTab.click();
        });
    }

    async openAddressTab() {
        await test.step('Open Address tab', async () => {
            await this.addressTab.click();
        });
    }

    async openItemsTab() {
        await test.step('Open Items tab', async () => {
            await this.itemsTab.click();
        });
    }

    async openDocumentsTab() {
        await test.step('Open Documents tab', async () => {
            await this.documentsTab.click();
        });
    }

    /* ================= KEY INFO ACTIONS ================= */

    async clickCurrency() {
        await test.step('Click Supplier Currency', async () => {
            await this.currency.click();
        });
    }

    async clickGroup() {
        await test.step('Click Supplier Group', async () => {
            await this.group.click();
        });
    }

    async selectGroup(value) {
        await test.step(`Select Supplier Group: ${value}`, async () => {
            await this.group.click();
            await this.lookup.selectListItem(value);
        });
    }

    async fillContactPerson(value) {
        await test.step(`Fill Contact Person Name: ${value}`, async () => {
            await this.contactPerson.click();
            await this.contactPerson.fill(value);
        });
    }

    async fillMobile(value) {
        await test.step(`Fill Mobile: ${value}`, async () => {
            await this.keyInfoMobile.click();
            await this.keyInfoMobile.fill(value);
        });
    }

    async fillEmail(value) {
        await test.step(`Fill Email: ${value}`, async () => {
            await this.keyInfoEmail.click();
            await this.keyInfoEmail.fill(value);
        });
    }

    async clickRestrictPaymentTerm() {
        await test.step('Click Restrict Payment Term', async () => {
            await this.restrictPaymentTerm.click();
        });
    }

    async clickSelectPaymentTerm() {
        await test.step('Click Select payment term', async () => {
            await this.selectPaymentTermField.click();
            await this.page.waitForTimeout(500);
        });
    }

    async selectAllPaymentTerms() {
        await test.step('Select all payment terms', async () => {
            await this.selectAllPaymentTerm.click();
            await this.page.waitForTimeout(500);
        });
    }

    async clickPayableAccount() {
        await test.step('Click payable account', async () => {
            await this.payableMainAccount.click();
        });
    }

    async selectPayableAccount(value) {
        await test.step(`Select payable account: ${value}`, async () => {
            await this.payableMainAccount.click();
            await this.lookup.selectLookupOption(value);
        });
    }

    async fillDescription(value) {
        await test.step(`Fill Description: ${value}`, async () => {
            await this.description.click();
            await this.description.fill(value);
        });
    }

    async clickEnableCreditControl() {
        await test.step('Click Enable Credit Control', async () => {
            await this.enableCreditControl.click();
        });
    }

    async fillCreditLimitAmount(value) {
        await test.step(`Fill Credit Limit Amount`, async () => {
            await this.creditLimitAmount.click();
            await this.creditLimitAmount.fill(String(value));
        });
    }

    async fillCreditLimitDays(value) {
        await test.step(`Fill Credit Limit Days`, async () => {
            await this.creditLimitDays.click();
            await this.creditLimitDays.fill(String(value));
        });
    }

    async clickSetDefaults() {
        await test.step('Click Set Defaults', async () => {
            await this.setDefaults.click();
        });
    }

    async scrollToShipmentPriority() {
        await this.shipmentPriority.scrollIntoViewIfNeeded();
    }

    async clickPaymentTerm() {
        await test.step('Click Payment Term', async () => {
            await this.paymentTerm.click();
        });
    }

    async selectPaymentTerm(value) {
        await test.step(`Select Payment Term: ${value}`, async () => {
            await this.paymentTerm.click();
            await this.lookup.selectLookupOption(value);
        });
    }

    async clickShippingTerm() {
        await test.step('Click Shipping Term', async () => {
            await this.shippingTerm.click();
        });
    }

    async selectShippingTerm(value) {
        await test.step(`Select Shipping Term: ${value}`, async () => {
            await this.shippingTerm.click();
            await this.lookup.selectListItem(value);
        });
    }

    async fillLoadingPort(value) {
        await test.step(`Fill Loading Port`, async () => {
            await this.loadingPort.click();
            await this.loadingPort.fill(String(value));
        });
    }

    async fillDestinationPort(value) {
        await test.step(`Fill Destination Port`, async () => {
            await this.destinationPort.click();
            await this.destinationPort.fill(String(value));
        });
    }

    async clickShippingMethod() {
        await test.step('Click Shipping Method', async () => {
            await this.shippingMethod.click();
        });
    }

    async selectShippingMethod(value) {
        await test.step(`Select Shipping Method: ${value}`, async () => {
            await this.shippingMethod.click();
            await this.lookup.selectListItem(value);
        });
    }

    async clickShipmentPriority() {
        await test.step('Click Shipment Priority', async () => {
            await this.shipmentPriority.click();
        });
    }

    async selectShipmentPriority(value) {
        await test.step(`Select Shipment Priority: ${value}`, async () => {
            await this.shipmentPriority.click();
            await this.lookup.selectListItem(value);
        });
    }

    async saveKeyInfo() {
        await test.step('Save Key Information', async () => {
            await this.saveKeyInformation.click();
            await this.page.waitForTimeout(500);
        });
    }

    /* ================= CONTACT PERSON ================= */

    async clickAddContactPerson(){
        await test.step('Click Contact Person', async () => {
            await this.addContactPerson.click();
        });
    }    

    async clickPrefix() {
        await test.step('Click Prefix', async () => {
            await this.prefix.click();
        });
    }

    async fillFirstName(value) {
        await test.step(`Fill First Name: ${value}`, async () => {
            await this.firstName.fill(value);
        });
    }

    async fillMiddleName(value) {
        await test.step(`Fill Middle Name: ${value}`, async () => {
            await this.middleName.fill(value);
        });
    }

    async fillLastName(value) {
        await test.step(`Fill Last Name: ${value}`, async () => {
            await this.lastName.fill(value);
        });
    }

    async fillJobTitle(value) {
        await test.step(`Fill Job Title: ${value}`, async () => {
            await this.jobTitle.fill(value);
        });
    }

    async clickGender() {
        await test.step('Click on Gender', async () => {
            await this.gender.click();
            await this.page.waitForTimeout(500);
        });
    }

    async fillContactPersonMobile(value) {
        await test.step(`Fill Contact Mobile: ${value}`, async () => {
            await this.contactPersonMobileNumber.fill(value);
        });
    }    

    async fillContactPersonTelephone(value) {
        await test.step(`Fill Contact Telephone: ${value}`, async () => {
            await this.contactPersonTelephoneNumber.fill(value);
        });
    }

    async fillContactPersonFax(value) {
        await test.step(`Fill Contact Person Fax Number: ${value}`, async () => {
            await this.contactPersonFaxNumber.fill(value);
        });
    }

    async fillContactEmail(value) {
        await test.step(`Fill Contact Person Email: ${value}`, async () => {
            await this.contactPersonEmail.fill(value);
        });
    }    

    async clickContactPersonDefault() {
        await test.step('Click Contact Person Default', async () => {
            await this.contactPersonDefault.click();
        });
    }

    async clickContactPersonFreezed() {
        await test.step('Click Contact Person Freezed', async () => {
            await this.contactPersonfreezed.click();
        });
    }

    async saveContactPersonDetails() {
        await test.step('Save Contact Person', async () => {
            await this.saveContactPerson.click();
        });
    }

    /* ================= ADDRESS ================= */

    async clickAddAddress(){
        await test.step('Click Address', async () => {
            await this.addAddress.click();
        });
    }

    async fillAddressDescription(value) {
        await test.step(`Fill Address Description: ${value}`, async () => {
            await this.addressDescription.fill(value);
        });
    }

    async fillAddress1(value) {
        await test.step(`Fill Address: ${value}`, async () => {
            // await this.address1.click();
            await this.address1.fill(value);
        });
    }

    async fillAddress2(value) {
        await test.step(`Fill Address: ${value}`, async () => {
            // await this.address2.click();
            await this.address2.fill(value);
        });
    }

    async fillAddress3(value) {
        await test.step(`Fill Address: ${value}`, async () => {
            // await this.address3.click();
            await this.address3.fill(value);
        });
    }

    async fillAddress4(value) {
        await test.step(`Fill Address: ${value}`, async () => {
            // await this.address4.click();
            await this.address4.fill(value);
        });
    }

    async fillAddress5(value) {
        await test.step(`Fill Address: ${value}`, async () => {
            // await this.address5.click();
            await this.address5.fill(value);
        });
    }

    async fillCity(value) {
        await test.step(`Fill City: ${value}`, async () => {
            // await this.city.click();
            await this.city.fill(value);
        });
    }

    async fillAddressState(value) {
        await test.step(`Fill State: ${value}`, async () => {
            // await this.state.click();
            await this.addressState.fill(value);
        });
    }

    async fillDialingCode(value) {
        await test.step(`Fill Dialing Code: ${value}`, async () => {
            // await this.dialingCode.click();
            await this.dialingCode.fill(value);
        });
    }

    async fillZipCode(value) {
        await test.step(`Fill Zip Code: ${value}`, async () => {
            // await this.zipCode.click();
            await this.zipCode.fill(value);
        });
    }

    async fillAddressContactPerson(value) {
        await test.step(`Fill Contact Person: ${value}`, async () => {
            // await this.addressContactPerson.click();
            await this.addressContactPerson.fill(value);
        });
    }

    async fillAddressEmail(value) {
        await test.step(`Fill Email: ${value}`, async () => {
            // await this.addressEmail.click();
            await this.addressEmail.fill(value);
        });
    }

    async fillAddressMobileNumber(value) {
        await test.step(`Fill MobileNumber: ${value}`, async () => {
            // await this.addressMobileNumber.click();
            await this.addressMobileNumber.fill(value);
        });
    }

    async fillAddressTelNumber(value) {
        await test.step(`Fill Tel Number: ${value}`, async () => {
            // await this.addressTelNumber.click();
            await this.addressTelNumber.fill(value);
        });
    }

    async fillAddressFaxNumber(value) {
        await test.step(`Fill Fax Number: ${value}`, async () => {
            // await this.addressFaxNumber.click();
            await this.addressFaxNumber.fill(value);
        });
    }

    async clickAddressDefault() {
        await test.step('Click Address Default', async () => {
            await this.addressDefault.click();
        });
    }

    async clickAddressFreezed() {
        await test.step('Click Address Freezed', async () => {
            await this.addressFreezed.click();
        });
    }

    /* ================= ITEMS ================= */
    async clickAddItem(){
        await test.step('Click Add Item', async () => {
            await this.addItem.click();
            // await this.page.waitForTimeout(1000);
        });
    }

    async clickItem() {
        await test.step('Click Item Lookup', async () => {
            await this.item.click();
        });
    }

    async selectItem(value) {
        await test.step(`Select Item: ${value}`, async () => {
            await this.item.click();
            await this.item.fill(value);
            await this.page.waitForTimeout(1000);
            await this.lookup.selectListItem(value);
        });
    }

    /* ================= DOCUMENTS ================= */
    async clickAddDocument(){
        await test.step('Click Add Document', async () => {
            await this.addDocument.click();
        });
    }
}