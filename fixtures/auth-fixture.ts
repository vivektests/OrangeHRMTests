import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Page } from '@playwright/test';

/**
 * Custom test fixtures for authentication
 */
type AuthFixtures = {
    /**
     * Page object that is already logged in with default admin credentials
     */
    loggedInPage: Page;
};

/**
 * Extended test object with authentication fixtures
 */
export const test = base.extend<AuthFixtures>({
    /**
     * Fixture that provides a page that is already logged in with default admin credentials
     */
    loggedInPage: async ({ page }, use) => {
        // Setup: Log in with default admin credentials
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.login("Admin", "admin123");
        
        // Use the logged-in page
        await use(page);
        
        // Optional teardown: Log out (commented out to avoid affecting test flow)
        // const homePage = new HomePage(page);
        // await homePage.logout();
    }
});

/**
 * Re-export expect from the base test
 */
export { expect } from '@playwright/test';
