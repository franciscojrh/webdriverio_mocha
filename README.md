# DemoBlaze Web Automation Test Suite

This project is a WebdriverIO + Mocha end-to-end automation suite for the DemoBlaze e-commerce website. It validates the user journey for account creation, login, cart management, and purchase flow using browser-driven tests and page object patterns.

Web Application URL: https://www.demoblaze.com/

## Scope

The test suite focuses on the most important user flows of the DemoBlaze storefront:

- User sign-up and login
- Product selection and detail verification
- Cart item addition and item count validation
- Cart cleanup
- Purchase checkout and confirmation validation

This project is intended to provide a reusable, maintainable UI automation framework for browser-based regression testing.

## Features

- Page Object Model (POM) for reusable browser interactions
- Mocha test framework for BDD-style specs
- WebdriverIO v10 for browser automation
- Chrome-based local execution
- Allure reporting for test execution results
- Data-driven constants for shared test inputs and expected values
- Reusable helper methods for login, purchases, and cart actions

## Test Coverage

The suite includes the following automated scenarios:

### 1. Login flow
- Creates a new test account
- Opens the app and signs in with the generated credentials
- Verifies the welcome message is displayed with the correct email address

Spec: `test/specs/login.e2e.js`

### 2. Cart flow
- Creates a test account
- Opens a product page
- Adds a product to the cart
- Verifies the product appears in the cart
- Removes all cart items after validation

Spec: `test/specs/cart.e2e.js`

### 3. Purchase flow
- Creates a new test account
- Adds a product to the cart
- Completes checkout with purchase details
- Verifies the confirmation pop-up and order summary details

Spec: `test/specs/purchase.e2e.js`

## Tech Stack

The versions below reflect the local machine and installed project dependencies when this README was updated. The Node and npm versions are local runtime versions; npm package versions are captured by `package-lock.json`.

| Tool / component | Version |
| --- | --- |
| Node.js | 24.21.0 |
| npm | 11.19.0 |
| JavaScript modules | ES Modules (`"type": "module"`); language version is not separately pinned |
| WebdriverIO CLI | 10.0.2 |
| WebdriverIO local runner | 10.0.2 |
| WebdriverIO Mocha framework | 10.0.1 |
| Mocha | 12.0.3 |
| WebdriverIO spec reporter | 10.0.1 |
| WebdriverIO Allure reporter | 10.0.1 |
| Allure Commandline | 2.46.1 |
| Google Chrome | 155.0.8059.40 |

To install the exact npm dependency versions recorded in the lockfile, use `npm ci` rather than `npm install`. Node.js and Chrome are installed separately and are not pinned by the npm lockfile, so install those versions separately when matching this environment is important.

## Project Structure

```text
mocha_wdio/
├── test/
│   ├── pageobjects/
│   │   ├── cart.page.js
│   │   ├── home.page.js
│   │   ├── product.page.js
│   │   └── purchase-confirmation.page.js
│   └── specs/
│       ├── cart.e2e.js
│       ├── login.e2e.js
│       └── purchase.e2e.js
├── testData/
│   └── testData.js
├── allure-results/
├── allure-report/
├── package.json
├── wdio.conf.js
└── README.md
```

## Prerequisites

Before running the tests, make sure the following are installed:

- Node.js (LTS recommended)
- npm
- Google Chrome browser
- A local environment capable of running browser automation

## Setup

1. Clone the project repository.
2. Open a terminal in the project root.
3. Install project dependencies:

```bash
npm install
```

4. Confirm Chrome is installed and available in your environment.

## Running the Test Suite

Run the full suite with the default WDIO configuration:

```bash
npm test
```

Run a single spec:

```bash
npx wdio run ./wdio.conf.js --spec ./test/specs/login.e2e.js
```

Run a named suite:

```bash
npm run test:smoke
```

Or use the project scripts directly:

```bash
npm run wdio
npm run test:login
npm run test:cart
npm run test:purchase
```

## Allure Reporting

This project configures the Allure report generator.

Generate the HTML report:

```bash
npm run allure:report
```

This command generates the report from `allure-results` and opens the report in the browser.

## Configuration Notes

- Base URL is configured to: `https://www.demoblaze.com`
- Test runner is set to local execution with a single Chrome instance.
- The suite uses Mocha `describe` and `it` blocks for test organization.
- Allure outputs are stored in `allure-results` and the generated HTML is under `allure-report`.

## Useful Tips for New Users

- Start with the login flow to confirm the environment is working correctly.
- Keep page object methods reusable and focused on UI behavior.
- If a test fails due to timing, check the browser wait conditions before changing business logic.
- Use Allure results to inspect failures and screenshots generated during the run.

## Notes

This project is built for learning and demonstration of WebdriverIO automation best practices. It is a practical example of UI test automation using the Page Object Model against a public demo application.
