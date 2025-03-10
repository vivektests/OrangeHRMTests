/* eslint-disable playwright/no-networkidle */
import { Page, Locator, expect } from '@playwright/test';

/**
 * Base page class that provides common functionality for all page objects
 */
export class BasePage {
    /**
     * Creates an instance of BasePage
     * @param page - The Playwright page object
     */
    constructor(protected readonly page: Page) {}
    
    /**
     * Navigates to the specified URL
     * @param url - The URL to navigate to
     */
    async navigateTo(url: string) {
        await this.page.goto(url);
    }
    
    /**
     * Waits for the page to be fully loaded
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
    
    /**
     * Clicks on the specified element
     * @param locator - The element to click
     */
    async clickElement(locator: Locator) {
        await locator.click();
    }
    
    /**
     * Fills the specified input field with text
     * @param locator - The input field
     * @param text - The text to fill
     */
    async fillInput(locator: Locator, text: string) {
        await locator.fill(text);
    }
    
    /**
     * Waits for the specified element to be visible
     * @param locator - The element to wait for
     * @param timeout - The maximum time to wait in milliseconds
     */
    async waitForElement(locator: Locator, timeout?: number) {
        await locator.waitFor({ state: 'visible', timeout });
    }
    
    /**
     * Verifies that the specified element is visible
     * @param locator - The element to verify
     * @param message - Optional assertion message
     */
    async expectToBeVisible(locator: Locator, message?: string) {
        await expect(locator, message).toBeVisible();
    }
    
    /**
     * Verifies that the specified element contains the expected text
     * @param locator - The element to verify
     * @param text - The expected text
     * @param message - Optional assertion message
     */
    async expectToContainText(locator: Locator, text: string, message?: string) {
        await expect(locator, message).toContainText(text);
    }
}
