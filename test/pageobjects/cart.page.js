class CartPage {
    get rows() {
        return $$('#tbodyid tr');
    }

    async open() {
        await $('a=Cart').click();
        await $('h2=Products').waitForDisplayed();
    }

    async getItems() {
        const rows = await this.rows;
        const items = [];

        for (let index = 0; index < rows.length; index += 1) {
            items.push(await rows[index].getText());
        }

        return items;
    }

    async waitForItemCount(count) {
        await browser.waitUntil(async () => (await this.rows).length === count, {
            timeoutMsg: `Expected ${count} cart item(s) to load`
        });
    }

    async removeAllItems() {
        while ((await this.rows).length > 0) {
            const previousCount = (await this.rows).length;
            await (await this.rows)[0].$('a=Delete').click();
            await browser.waitUntil(async () => (await this.rows).length < previousCount);
        }
    }

    async placeOrder() {
        await $('button=Place Order').click();
    }

    async purchase(details) {
        await $('#name').setValue(details.name);
        await $('#country').setValue(details.country);
        await $('#city').setValue(details.city);
        await $('#card').setValue(details.card);
        await $('#month').setValue(details.month);
        await $('#year').setValue(details.year);
        await $('button=Purchase').click();
    }
}

export default new CartPage();
