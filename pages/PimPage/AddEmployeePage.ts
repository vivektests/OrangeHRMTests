import { Locator, Page } from "@playwright/test";
import path from "path";
import { BasePage } from "../BasePage";
import { AddEmployeeSelectors } from "../../constants/selectors";

/**
 * Page object for the Add Employee page
 */
export class AddEmployeePage extends BasePage {
    private firstName: Locator;
    private middleName: Locator;
    private lastName: Locator;
    private createLoginDetailsSwitch: Locator;
    private username: Locator;
    private password: Locator;
    private confirmPassword: Locator;
    private saveButton: Locator;
    private cancelButton: Locator;
    private uploadPhoto: Locator;
    
    /**
     * Creates an instance of AddEmployeePage
     * @param page - The Playwright page object
     */
    constructor(page: Page) {
        super(page);
        this.firstName = this.page.getByRole('textbox', { name: 'First Name' });
        this.middleName = this.page.getByRole('textbox', { name: 'Middle Name' });
        this.lastName = this.page.getByRole('textbox', { name: 'Last Name' });
        this.createLoginDetailsSwitch = this.page.locator(AddEmployeeSelectors.CREATE_LOGIN_SWITCH);
        this.username = this.page.locator(AddEmployeeSelectors.USERNAME_INPUT);
        this.password = this.page.locator(AddEmployeeSelectors.PASSWORD_INPUT).first();
        this.confirmPassword = this.page.locator(AddEmployeeSelectors.PASSWORD_INPUT).nth(1);
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.uploadPhoto = this.page.locator(AddEmployeeSelectors.UPLOAD_PHOTO);
    }

    /**
     * Adds an employee without photo and login details
     * @param firstName - The employee's first name
     * @param middleName - The employee's middle name
     * @param lastName - The employee's last name
     */
    async addEmployeeWithoutPhotoAndLoginDetails(firstName:string, middleName:string, lastName:string){
        await this.waitForElement(this.firstName);
        await this.fillInput(this.firstName, firstName);
        await this.fillInput(this.middleName, middleName);
        await this.fillInput(this.lastName, lastName);
        await this.clickElement(this.saveButton);
        await this.waitForPageLoad();
    }

    /**
     * Adds an employee with photo but without login details
     * @param firstName - The employee's first name
     * @param middleName - The employee's middle name
     * @param lastName - The employee's last name
     */
    async addEmployeeWithoutLoginDetails(firstName:string, middleName:string, lastName:string){
        await this.waitForElement(this.firstName);
        await this.fillInput(this.firstName, firstName);
        await this.fillInput(this.middleName, middleName);
        await this.fillInput(this.lastName, lastName);
        
        // Set up file chooser handler before triggering the file dialog
        this.page.once('filechooser', async fileChooser => {
            await fileChooser.setFiles(path.resolve(__dirname, '../../resources/selfie.jpeg'));
        });
        
        // Click the upload photo button
        await this.clickElement(this.uploadPhoto);
        
        await this.clickElement(this.saveButton);
        await this.waitForPageLoad();
    }

    /**
     * Adds an employee with all details including photo and login credentials
     * @param firstName - The employee's first name
     * @param middleName - The employee's middle name
     * @param lastName - The employee's last name
     */
    async addEmployeeWithAllDetails(firstName:string, middleName:string, lastName:string){
        await this.waitForElement(this.firstName);
        await this.fillInput(this.firstName, firstName);
        await this.fillInput(this.middleName, middleName);
        await this.fillInput(this.lastName, lastName);
        
        // Set up file chooser handler before triggering the file dialog
        this.page.once('filechooser', async fileChooser => {
            await fileChooser.setFiles(path.resolve(__dirname, '../../resources/selfie.jpeg'));
        });
        
        // Click the upload photo button
        await this.clickElement(this.uploadPhoto);
        
        // Enable login details
        await this.clickElement(this.createLoginDetailsSwitch);
        
        // Wait for login fields to appear
        await this.waitForElement(this.username);
        
        // Fill login details
        await this.fillInput(this.username, firstName);
        await this.fillInput(this.password, "password123");
        await this.fillInput(this.confirmPassword, "password123");
        
        await this.clickElement(this.saveButton);
        await this.waitForPageLoad();
    }
}
