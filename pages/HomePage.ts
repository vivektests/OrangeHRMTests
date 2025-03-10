import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HomePageSelectors } from "../constants/selectors";

/**
 * Page object for the home page
 */
export class HomePage extends BasePage {
    private readonly loginButton: Locator;
    private readonly userProfile: Locator;
    private readonly logoutButton: Locator;
    private readonly pimButton: Locator;

    /**
     * Creates an instance of HomePage
     * @param page - The Playwright page object
     */
    constructor(page: Page) {
        super(page);
        this.loginButton = this.page.getByRole("button", {name: "Login"});
        this.userProfile = this.page.locator(HomePageSelectors.USER_PROFILE);
        this.logoutButton = this.page.getByRole('menuitem', { name: 'Logout' });
        this.pimButton = this.page.getByRole('link', { name: 'PIM' });
    }

    /**
     * Logs out of the application
     */
    async logout() {
        await this.clickElement(this.userProfile);
        await this.clickElement(this.logoutButton);
        await this.waitForPageLoad();
    }

    /**
     * Validates that the logout was successful
     */
    async logoutValidation() {
        await this.expectToBeVisible(this.loginButton, "Login button should be visible after logout");
    }

    /**
     * Clicks on the PIM module link
     */
    async clickOnPimModule(){
        await this.clickElement(this.pimButton);
        await this.waitForPageLoad();
    }
}
