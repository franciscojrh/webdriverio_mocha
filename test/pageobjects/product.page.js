class ProductPage {
    get title() {
        return $('h2');
    }

    async addToCart() {
        const productAlert = new Promise((resolve, reject) => {
            browser.once('dialog', async (dialog) => {
                try {
                    const message = dialog.message();
                    await dialog.accept();
                    resolve(message);
                } catch (error) {
                    reject(error);
                }
            });
        });

        await $('a=Add to cart').click();
        return productAlert;
    }
}

export default new ProductPage();
