class HomePage {
    async open() {
        await browser.url('/index.html');
        await $('a=PRODUCT STORE').waitForDisplayed();
    }

    async createAccount(username, password) {
        await $('a=Sign up').click();
        await $('#sign-username').setValue(username);
        await $('#sign-password').setValue(password);

        const signupAlert = new Promise((resolve, reject) => {
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

        await $('button=Sign up').click();
        return signupAlert;
    }

    async login(username, password) {
        await $('a=Log in').click();
        await $('#loginusername').setValue(username);
        await $('#loginpassword').setValue(password);
        await $('button=Log in').click();
    }

    welcomeMessage(username) {
        return $(`a=Welcome ${username}`);
    }

    async selectProduct(name) {
        await $(`a=${name}`).click();
        await $('h2').waitForDisplayed();
    }
}

export default new HomePage();
