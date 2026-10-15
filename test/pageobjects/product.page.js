class ProductPage {
    get title() {
        return $('h2');
    }

    get addToCartButton() {
        return $('a=Add to cart');
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

        await this.addToCartButton.click();
        return productAlert;
    }
}

export default new ProductPage();
