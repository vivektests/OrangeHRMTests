# OrangeSource Test Automation Framework

A Playwright-based test automation framework for OrangeHRM, implementing best practices for maintainable and reliable tests.

## Project Structure

```
├── constants/              # Constants used across the project
│   └── selectors.ts        # Selectors for page objects
├── fixtures/               # Test fixtures
│   └── auth-fixture.ts     # Authentication fixtures
├── pages/                  # Page Object Models
│   ├── BasePage.ts         # Base page with common functionality
│   ├── HomePage.ts         # Home page object
│   ├── LoginPage.ts        # Login page object
│   └── PimPage/            # PIM module page objects
│       ├── AddEmployeePage.ts
│       └── EmployeeListPage.ts
├── resources/              # Test resources
│   └── selfie.jpeg         # Sample image for employee photo
├── test-data/              # Test data
│   └── loginTestData.json  # Login test data
├── tests/                  # Test files
│   ├── login_logout_test.spec.ts
│   └── pim_test.spec.ts
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts
└── playwright.config.ts    # Playwright configuration
```

## Best Practices Implemented

1. **Page Object Model (POM)**: Separates test logic from page interactions
   - Base page class with common functionality
   - Page-specific classes that extend the base page

2. **Selectors Management**: Centralized selectors in constants
   - Easier maintenance
   - Better readability

3. **Test Fixtures**: Reusable test setup and teardown
   - Authentication fixture for pre-authenticated tests
   - Reduces code duplication

4. **Improved Wait Strategies**: 
   - Replaced hardcoded waits with more reliable wait strategies
   - Better test stability

5. **Type Safety**: 
   - TypeScript interfaces for test data
   - Better type checking and IDE support

6. **Test Organization**: 
   - Tests grouped by functionality using `test.describe`
   - Clear test naming conventions

7. **Documentation**: 
   - JSDoc comments for methods and classes
   - README documentation

8. **Proper Error Handling**: 
   - Descriptive assertion messages
   - Better error reporting

## Running Tests

The following npm scripts are available:

```bash
# Run all tests
npm test

# Run tests in headed mode (with browser visible)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Show the HTML report
npm run report

# Run tests in parallel
npm run test:parallel
```

## Environment Configuration

Environment variables are stored in the `.env` file:

```
LOGIN_URL=https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

## Test Data

Test data is stored in JSON files in the `test-data` directory. The data is typed using TypeScript interfaces for better type checking.

## Reporting

The framework uses Playwright's built-in HTML reporter and Allure reporter for comprehensive test reporting.

## Commands to run before running tests

npm init playwright --yes

npm install dotenv --save

npm install --save-dev @playwright/test allure-playwright

npm install eslint

npm install -D allure-playwright