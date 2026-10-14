import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';
import ProductPage from '../pageobjects/product.page.js';
import CartPage from '../pageobjects/cart.page.js';
import PurchaseConfirmationPage from '../pageobjects/purchase-confirmation.page.js';

import { TEST_DATA } from '../../testData/testData.js';

const email = `qa-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.test`;

describe('Purchase', () => {
    before(async () => {
        await HomePage.open();
        expect(await HomePage.createAccount(email, TEST_DATA.password)).toBe(TEST_DATA.accountCreationSuccessMessage);
    });

    beforeEach(async () => {
        await HomePage.open();
    });

    async function loginTestUser() {
        if (await HomePage.welcomeMessage(email).isDisplayed()) {
            return;
        }

        await HomePage.login(email, TEST_DATA.password);
        await expect(HomePage.welcomeMessage(email)).toBeDisplayed();
    }

    it('completes checkout and validates the confirmation pop-up', async () => {
        await loginTestUser();
        await HomePage.selectProduct(TEST_DATA.productName);
        expect(await ProductPage.addToCart()).toBe(TEST_DATA.productAddedMessage);

        await CartPage.open();
        await CartPage.waitForItemCount(1);
        await expect(CartPage.rows).toBeElementsArrayOfSize(1);
        expect((await CartPage.getItems())[0]).toContain(TEST_DATA.productName);

        await CartPage.placeOrder();
        await CartPage.purchase(TEST_DATA.purchaseDetails);

        await expect(PurchaseConfirmationPage.title).toBeDisplayed();
        await expect(PurchaseConfirmationPage.details).toBeDisplayed();
        const confirmationText = await PurchaseConfirmationPage.details.getText();
        expect(confirmationText).toContain(TEST_DATA.confirmation.amount);
        expect(confirmationText).toContain(TEST_DATA.confirmation.customerName);
        await PurchaseConfirmationPage.close();
    });
});
