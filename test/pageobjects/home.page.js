class HomePage {
    async open() {
        await browser.url('/index.html');
        await $('a=PRODUCT STORE').waitForDisplayed();
    }

    async createAccount(username, password) {
        await $('a=Sign up').click();

        const usernameInput = $('#sign-username');
        const passwordInput = $('#sign-password');
        await usernameInput.waitForClickable();
        await passwordInput.waitForClickable();
        await usernameInput.click();
        await usernameInput.setValue(username);
        await passwordInput.click();
        await passwordInput.setValue(password);

        for (let attempt = 0; attempt < 3; attempt += 1) {
            const currentUsername = await usernameInput.getValue();
            const currentPassword = await passwordInput.getValue();
            if (currentUsername === username && currentPassword === password) {
                break;
            }

            if (currentUsername !== username) {
                await usernameInput.click();
                await usernameInput.setValue(username);
            }
            if (currentPassword !== password) {
                await passwordInput.click();
                await passwordInput.setValue(password);
            }
        }

        await browser.waitUntil(async () => (
            await usernameInput.getValue() === username
            && await passwordInput.getValue() === password
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

        const signupButton = $('button=Sign up');
        await signupButton.waitForClickable();
        await signupButton.click();
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
