import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginPageSelectors } from "../constants/selectors";

/**
 * Page object for the login page
 */
export class LoginPage extends BasePage {
    private userNameTextBox: Locator;
    private passwordTextBox: Locator;
    private loginButton: Locator;
    private requiredUsername: Locator;
    private requiredPassword: Locator;
    private alert: Locator;
    private homePageHeading: Locator;
    
    /**
     * Creates an instance of LoginPage
     * @param page - The Playwright page object
     */
    constructor(page: Page) {
        super(page);
        this.userNameTextBox = this.page.getByPlaceholder("Username");
        this.passwordTextBox = this.page.getByPlaceholder("Password");
        this.loginButton = this.page.getByRole("button", {name: "Login"});
        this.requiredUsername = this.page.locator(LoginPageSelectors.REQUIRED_USERNAME);
        this.requiredPassword = this.page.locator(LoginPageSelectors.REQUIRED_PASSWORD);
        this.alert = this.page.locator(LoginPageSelectors.ALERT);
        this.homePageHeading = this.page.getByRole('heading');
    }

    /**
     * Navigates to the login page
     */
    async visit() {
        await this.navigateTo(process.env.LOGIN_URL ?? "");
        await this.waitForPageLoad();
    }

    /**
     * Logs in with the provided credentials
     * @param username - The username to log in with
     * @param password - The password to log in with
     */
    async login(username: string, password: string) {
        await this.fillInput(this.userNameTextBox, username);
        await this.fillInput(this.passwordTextBox, password);
        await this.clickElement(this.loginButton);
    }

    /**
     * Validates the login based on the provided credentials and test type
     * @param username - The username used for login
     * @param password - The password used for login
     * @param testType - The type of test (Positive or Negative)
     */
    async loginValidation(username: string, password: string, testType: string) {
        if(username.length != 0 && password.length != 0 && testType === "Negative"){
            await this.invalidCredentials();
        }
        if(username.length === 0){
            await this.validateUsernameIsNotPresent();
        }
        if(password.length === 0){
            await this.validatePasswordIsNotPresent();
        }
        if(testType === "Positive"){
            await this.successLogin();
        }
    }

    /**
     * Validates that the username required error is displayed
     */
    async validateUsernameIsNotPresent(){
        await this.expectToBeVisible(this.requiredUsername, "Username required message should be visible");
    }

    /**
     * Validates that the password required error is displayed
     */
    async validatePasswordIsNotPresent(){
        await this.expectToBeVisible(this.requiredPassword, "Password required message should be visible");
    }

    /**
     * Validates that the invalid credentials error is displayed
     */
    async invalidCredentials(){
        await this.expectToBeVisible(this.alert, "Invalid credentials alert should be visible");
    }

    /**
     * Validates that the login was successful
     */
    async successLogin(){
        await this.expectToContainText(this.homePageHeading, 'Dashboard', "Dashboard heading should be visible after successful login");
    }
}
