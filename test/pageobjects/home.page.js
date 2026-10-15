class HomePage {
    get usernameInput() {
        return $('#sign-username');
    }

    get passwordInput() {
        return $('#sign-password');
    }

    get signupButton() {
        return $('button=Sign up');
    }

    async open() {
        await browser.url('/index.html');
        await $('a=PRODUCT STORE').waitForDisplayed();
    }

    async createAccount(username, password) {
        await $('a=Sign up').click();

        await this.usernameInput.waitForClickable();
        await this.passwordInput.waitForClickable();
        await this.usernameInput.click();
        await this.usernameInput.setValue(username);
        await this.passwordInput.click();
        await this.passwordInput.setValue(password);

        for (let attempt = 0; attempt < 3; attempt += 1) {
            const currentUsername = await this.usernameInput.getValue();
            const currentPassword = await this.passwordInput.getValue();
            if (currentUsername === username && currentPassword === password) {
                break;
            }

            if (currentUsername !== username) {
                await this.usernameInput.click();
                await this.usernameInput.setValue(username);
            }
            if (currentPassword !== password) {
                await this.passwordInput.click();
                await this.passwordInput.setValue(password);
            }
        }

        await browser.waitUntil(async () => (
            await this.usernameInput.getValue() === username
            && await this.passwordInput.getValue() === password
        ), {
            timeout: 1000,
            timeoutMsg: 'Sign-up form values were not entered before submitting.'
        });

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

        await this.signupButton.waitForClickable();
        await this.signupButton.click();
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
