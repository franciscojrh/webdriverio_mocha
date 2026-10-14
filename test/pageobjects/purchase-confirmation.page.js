class PurchaseConfirmationPage {
    get title() {
        return $('h2=Thank you for your purchase!');
    }

    get details() {
        return $('.sweet-alert');
    }

    async close() {
        await $('button=OK').click();
    }
}

export default new PurchaseConfirmationPage();
