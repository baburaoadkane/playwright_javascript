export class ChargePage {
    constructor(page){
        this.page= page;

        this.defaultValue = page.locator('#Charge\\.DefaultValue_I');
    }

    async fillDefaultValue(value){
        await this.defaultValue.fill(String(value));
    }
}