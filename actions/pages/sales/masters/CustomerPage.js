export class CustomerPage {
    constructor(page) {
        this.page = page;

        //Tax Details
        this.country = page.locator("input[id*='CountryId']");
        this.state = page.locator("input[id*='CountryStateId']");
        this.taxTreatment = page.locator("input[id*='TaxTreatment']");
        this.taxRegistrationNumber = page.locator("input[id*='TaxRegistrationNumber']");
        this.back = page.locator('#pre-Button');
        this.cancel = page.locator('.dx-clear-button-area');

        //Tabs
        this.keyInfoTab = page.getByRole('tab', { name: 'Key Info' });
        this.addressTab = page.getByRole('tab', { name: 'Address' });
        this.contactPersonTab = page.getByRole('tab', { name: 'Contact Person' });
        this.documentsTab = page.getByRole('tab', { name: 'Documents' });

        //Key Info
        this.group = page.locator("input[id*='CustomerGroupId']");
        this.keyInfoEmail = page.locator("input[name='Email']");
        this.keyInfoMobile = page.locator("input[id='phone']");
        this.telephone = page.locator("input[id*='TelNumber']");
        this.restrictPaymentTerm = page.locator('#CustomRestrictPaymentTermCheck');
        this.selectPaymentTerm = page.getByPlaceholder('Select payment term...');
        this.restrictPriceList = page.locator('#CustomRestrictPriceListCheck');
        this.selectPriceList = page.getByPlaceholder('Select price list...');
        this.selectAllPaymentTerm = page.getByRole('checkbox', { name: 'Select All' });
        this.selectAllPriceList = page.getByRole('checkbox', { name: 'Select All', exact: true });
        this.receivableMainAccount = page.locator("input[id*='ReceivableMainAccountId']");
        this.description = page.locator("textarea[name='Description']");
        this.saveKeyInfo = page.locator('#InfoSave');

        // Credit Control
        this.enableCreditControl = page.locator('#EnableCreditControl');
        this.creditLimitAmount = page.getByLabel(/Credit Limit Amount/i);
        this.creditLimitDays = page.getByLabel(/Credit Limit Days/i);
        this.creditRating = page.getByLabel(/Credit Rating/i);
        this.creditCheckMode = page.getByLabel(/Credit Check Mode/i);

        // Defaults
        this.setDefaults = page.locator('#EnableDefaults');
        this.salesman = page.getByLabel(/Salesman/i);
        this.paymentTerm = page.getByLabel(/Payment Term/i);
        this.priceList = page.getByLabel(/Price List/i);
        this.shippingTerm = page.getByLabel(/Shipping Term/i);
        this.loadingPort = page.getByLabel(/Loading Port/i);
        this.destinationPort = page.getByLabel(/Destination Port/i);
        this.shippingMethod = page.getByLabel(/Shipping Method/i);
        this.shipmentPriority = page.getByLabel(/Shipment Priority/i);

        //Address
        this.billingAddress1 = page.locator("input[id*='BillingAddress1']");
        this.billingAddress2 = page.locator("input[id*='BillingAddress2']");
        this.billingCountry = page.locator("input[id*='BillingCountry']");
        this.billingState = page.locator("input[id*='BillingState']");
        this.billingCity = page.locator("input[id*='BillingCity']");
        this.billingZipCode = page.locator("input[name='BillingZipcode']");
        this.billingContactPerson = page.locator("input[id*='BillingContactPerson']");
        this.sameAsBillingAddress = page.getByRole('checkbox', { name: /Billing Address Same As Shipping Address/i });
        this.shippingAddress1 = page.locator("input[id*='ShippingAddress1']");
        this.shippingAddress2 = page.locator("input[id*='ShippingAddress2']");
        this.shippingCountry = page.locator("input[id*='ShippingCountry']");
        this.shippingState = page.locator("input[id*='ShippingState']");
        this.shippingCity = page.locator("input[id*='ShippingCity']");
        this.shippingZipCode = page.locator("input[id*='ShippingZipcode']");
        this.shippingContactPerson = page.locator("input[id*='ShippingContactPerson']");
        this.saveAddress = page.locator('#InfoSaveAddress');

        //Contact Person
        this.addRow = page.getByRole('button', { name: 'Add a row' });
        this.prefix = page.locator("input[id*='Prefix']");
        this.firstName = page.getByRole('textbox', { name: 'First Name:', exact: true });
        this.lastName = page.getByRole('textbox', { name: 'Last Name:', exact: true });
        this.jobTitle = page.getByRole('textbox', { name: 'Job Title:', exact: true });
        this.gender = page.getByRole('combobox', { name: 'Gender:', exact: true});
        this.contactMobile = page.getByRole('textbox', { name: 'Mobile #:' });
        this.telephoneNumber = page.getByRole('textbox', { name: 'Telephone #:' });
        this.contactEmail = page.getByRole('textbox', { name: 'Email:' });
        this.isDefault = page.locator("div[id*='Default']").nth(1);
        this.portalAccess = page.locator("div[id*='PortalAccess']");
        this.freezed = page.locator("div[id*='Freezed']");
        this.saveContactPerson = page.getByRole('button', { name: 'Save', exact: true });
    }

    async clickOnCountry() {
        await this.country.click();
    }

    async clickOnState() {
        await this.state.click();
    }

    async clickOnTaxTreatment() {
        await this.taxTreatment.click();
    }

    async fillTaxRegistrationNumber(value) {
        await this.taxRegistrationNumber.fill(value);
    }

    async clickOnBack() {
        await this.back.click();
    }

    async clickOnCancel() {
        await this.cancel.click();
    }

    async clickOnKeyInfoTab() {
        await this.keyInfoTab.click();
    }

    async clickOnAddressTab() {
        await this.addressTab.click();
    }

    async clickOnContactPersonTab() {
        await this.contactPersonTab.click();
    }

    async clickOnDocumentsTab() {
        await this.documentsTab.click();
    }

    async clickOnGroup() {
        await this.group.click();
    }

    async fillEmail(value) {
        await this.keyInfoEmail.click();
        await this.keyInfoEmail.fill(value);
    }

    async fillMobile(value) {
        await this.keyInfoMobile.click();
        await this.keyInfoMobile.fill(value);
    }

    async fillTelephone(value) {
        await this.telephone.click();
        await this.telephone.fill(value);
    }

    async clickOnRestrictPaymentTerm() {
        await this.restrictPaymentTerm.click();
    }

    async clickOnSelectPaymentTerm() {
        await this.selectPaymentTerm.click();
    }

    async clickOnRestrictPriceList() {
        await this.restrictPriceList.click();
    }

    async clickOnSelectPriceList() {
        await this.selectPriceList.click();
    }

    async clickOnSelectAllPaymentTerm() {
        await this.selectAllPaymentTerm.click();
        await this.page.waitForTimeout(500);
    }

    async clickOnSelectAllPriceList() {
        await this.selectAllPriceList.click();
        await this.page.waitForTimeout(500);
    }

    async fillDescription(value) {
        await this.description.click();
        await this.description.fill(value);
    }

    async clickOnReceivableAccount() {
        await this.receivableMainAccount.click();
    }

    async clickOnEnableCreditControl() {
        await this.enableCreditControl.click();
    }

    async scrollToCreditCheckMode() {
        await this.creditCheckMode.scrollIntoViewIfNeeded();
    }

    async fillCreditLimitAmount(value) {
        await this.creditLimitAmount.click();
        await this.creditLimitAmount.fill(String(value));
    }

    async fillCreditLimitDays(value) {
        await this.creditLimitDays.click();
        await this.creditLimitDays.fill(String(value));
    }

    async clickOnCreditRating() {
        await this.creditRating.click();
        await this.page.waitForTimeout(500);
    }

    async clickOnCreditCheckMode() {
        await this.creditCheckMode.click();
    }

    async clickOnSetDefaults() {
        await this.setDefaults.click();
    }

    async scrollToShipmentPriority() {
        await this.shipmentPriority.scrollIntoViewIfNeeded();
    }

    async clickOnSalesman() {
        await this.salesman.click();
    }

    async clickOnPaymentTerm() {
        await this.paymentTerm.click();
    }

    async clickOnPriceList() {
        await this.priceList.click();
    }

    async clickOnShippingTerm() {
        await this.shippingTerm.click();
    }

    async fillLoadingPort(value) {
        await this.loadingPort.click();
        await this.loadingPort.fill(String(value));
    }

    async fillDestinationPort(value) {
        await this.destinationPort.click();
        await this.destinationPort.fill(String(value));
    }

    async clickOnShippingMethod() {
        await this.shippingMethod.click();
    }

    async clickOnShipmentPriority() {
        await this.shipmentPriority.click();
    }

    async clickOnSaveKeyInfo() {
        await this.saveKeyInfo.waitFor();
        await this.saveKeyInfo.scrollIntoViewIfNeeded();
        await this.saveKeyInfo.click();
        await this.page.waitForTimeout(1500);
    }

    async fillBillingAddress1(value) {
        await this.billingAddress1.click();
        await this.billingAddress1.fill(value);
    }

    async fillBillingAddress2(value) {
        await this.billingAddress2.click();
        await this.billingAddress2.fill(value);
    }

    async clickOnBillingCountry() {
        await this.billingCountry.click();
        await this.page.waitForTimeout(1000);
    }

    async fillBillingCountry(value) {
        await this.billingCountry.click();
        await this.billingCountry.fill(value);
        // await this.page.waitForTimeout(1000);
    }

    async clickOnBillingState() {
        await this.billingState.click();
        await this.page.waitForTimeout(1000);
    }

    async fillBillingState(value) {
        await this.billingState.click();
        await this.billingState.fill(value);
        // await this.page.waitForTimeout(1000);
    }

    async scrollToContactPerson() {
        await this.billingContactPerson.scrollIntoViewIfNeeded();
    }

    async scrollToShippingContactPerson() {
        await this.shippingContactPerson.scrollIntoViewIfNeeded();
    }

    async fillBillingCity(value) {
        await this.billingCity.click();
        await this.billingCity.fill(value);
    }

    async fillBillingZipCode(value) {
        await this.billingZipCode.click();
        // await this.page.waitForTimeout(500);
        await this.billingZipCode.fill(value);
    }

    async fillBillingContactPerson(value) {
        await this.billingContactPerson.click();
        await this.billingContactPerson.fill(value);
    }

    async checkSameAsBillingAddress() {
        if (!(await this.sameAsBillingAddress.isChecked())) {
            await this.sameAsBillingAddress.check();
        }
    }

    async fillShippingAddress1(value) {
        await this.shippingAddress1.click();
        await this.shippingAddress1.fill(value);
    }

    async fillShippingAddress2(value) {
        await this.shippingAddress2.click();
        await this.shippingAddress2.fill(value);
    }

    async clickOnShippingCountry() {
        await this.shippingCountry.click();
    }

    async fillShippingCountry(value) {
        await this.shippingCountry.click();
        await this.shippingCountry.fill(value);
        // await this.page.waitForTimeout(1000);
    }

    async clickOnShippingState() {
        await this.shippingState.click();
    }

    async fillShippingState(value) {
        await this.shippingState.click();
        await this.shippingState.fill(value);
        // await this.page.waitForTimeout(1000);
    }

    async fillShippingCity(value) {
        await this.shippingCity.click();
        await this.shippingCity.fill(value);
    }

    async fillShippingZipCode(value) {
        await this.shippingZipCode.click();
        await this.page.waitForTimeout(500);
        await this.shippingZipCode.fill(value);
    }

    async fillShippingContactPerson(value) {
        await this.shippingContactPerson.click();
        await this.shippingContactPerson.fill(value);
    }

    async clickOnSaveAddress() {
        await this.saveAddress.scrollIntoViewIfNeeded();
        await this.saveAddress.click();
        await this.page.waitForTimeout(1500);
    }

    async clickOnAddRow() {
        await this.addRow.click();
        await this.page.waitForTimeout(1000);
    }

    async clickOnPrefix() {
        await this.prefix.click();
        // await this.prefix.fill(value);
        // await this.page.waitForTimeout(500);
    }

    async fillFirstName(value) {
        // await this.firstName.click();
        await this.firstName.fill(value);
    }

    async fillLastName(value) {
        // await this.lastName.click();
        await this.lastName.fill(value);
    }

    async fillJobTitle(value) {
        // await this.lastName.click();
        await this.jobTitle.fill(value);
    }

    async clickOnGender() {
        await this.gender.click();
        await this.page.waitForTimeout(500);
        // await this.gender.fill(value);
    }

    async fillContactPersonMobile(value) {
        // await this.lastName.click();
        await this.contactMobile.fill(value);
    }

    async fillContactPersonTelephone(value) {
        // await this.lastName.click();
        await this.telephoneNumber.fill(value);
    }

    async fillContactPersonEmail(value) {
        // await this.lastName.click();
        await this.contactEmail.fill(value);
    } 
    
    async clickOnDefault(){
        await this.isDefault.check();
    }

    async clickOnPortalAccess(){
        await this.portalAccess.check();
    }

    async clickOnFreezed(){
        await this.freezed.check();
    }

    async clickOnSaveContactPerson() {
        await this.saveContactPerson.click();
        // await this.page.locator('span.dx-button-text', { hasText: 'Save' }).click();
        await this.page.waitForTimeout(2000);
    }

}