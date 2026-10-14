import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';

import { TEST_DATA } from '../../testData/testData.js';

const email = `qa-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.test`;

describe('Login', () => {
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

    it('logs in and shows the welcome label with the account email', async () => {
        await loginTestUser();
        await expect(HomePage.welcomeMessage(email)).toBeDisplayed();
        await expect(HomePage.welcomeMessage(email)).toHaveText(`Welcome ${email}`);
    });
});