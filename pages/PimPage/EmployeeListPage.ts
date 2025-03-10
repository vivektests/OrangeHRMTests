/* eslint-disable playwright/no-networkidle */
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { EmployeeListSelectors } from "../../constants/selectors";

/**
 * Page object for the Employee List page
 */
export class EmployeeListPage extends BasePage {
    private employeeName: Locator;
    private employeeId: Locator;
    private employmentStatusDropDown: Locator;
    private supervisorName: Locator;
    private includeDropDown: Locator;
    private jobTitleDropDown: Locator;
    private subUnitDropDown: Locator;
    private searchButton: Locator;
    private resetButton: Locator;
    private addButton: Locator;
    private noOfRecords: Locator;
    private firstEmployee: Locator;
    private delete: Locator;
    private editOption: Locator;
    private getDetail: Locator;

    /**
     * Creates an instance of EmployeeListPage
     * @param page - The Playwright page object
     */
    constructor(page: Page) {
        super(page);
        this.employeeName = this.page.getByRole('textbox', { name: 'Type for hints...' }).first();
        this.employeeId = this.page.getByRole('textbox').nth(2);
        this.employmentStatusDropDown = this.page.locator(EmployeeListSelectors.EMPLOYMENT_STATUS_DROPDOWN).first();
        this.includeDropDown = this.page.locator(EmployeeListSelectors.EMPLOYMENT_STATUS_DROPDOWN).nth(1);
        this.supervisorName = this.page.getByRole('textbox', { name: 'Type for hints...' }).nth(1);
        this.jobTitleDropDown = this.page.locator(EmployeeListSelectors.EMPLOYMENT_STATUS_DROPDOWN).nth(2);
        this.subUnitDropDown = this.page.locator(EmployeeListSelectors.EMPLOYMENT_STATUS_DROPDOWN).nth(3);
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
        this.resetButton = this.page.getByRole('button', { name: 'Reset' });
        this.addButton = this.page.getByRole('button', { name: ' Add' });
        this.noOfRecords = this.page.locator(EmployeeListSelectors.RECORDS_COUNT).first();
        this.firstEmployee = this.page.locator(EmployeeListSelectors.EMPLOYEE_ROW).first();
        this.delete = this.page.locator(EmployeeListSelectors.DELETE_BUTTON).first();
        this.editOption = this.page.locator(EmployeeListSelectors.EDIT_BUTTON).first();
        this.getDetail = this.page.locator(EmployeeListSelectors.EMPLOYEE_DETAIL);
    }

    /**
     * Searches for employees with multiple filters
     */
    async searchEmployeesWithMultipleFilters(){
        await this.clickElement(this.resetButton);
        await this.clickElement(this.employmentStatusDropDown);
        await this.clickElement(this.page.getByRole('option', { name: 'Full-Time Permanent' }));
        await this.clickElement(this.jobTitleDropDown);
        await this.clickElement(this.page.getByRole('option', { name: 'Software Engineer' }));
        await this.clickElement(this.searchButton);
        await this.waitForPageLoad();
    }

    /**
     * Searches for employees with employee name filter
     * @param employeeName - The employee name to search for
     */
    async searchEmployeesWithOneFilterEmployeeName(employeeName:string){
        await this.clickElement(this.resetButton);
        await this.clickElement(this.employeeName);
        await this.fillInput(this.employeeName, employeeName);
        // Wait for the dropdown to appear/disappear
        await this.page.waitForLoadState('networkidle');
        await this.clickElement(this.searchButton);
        await this.waitForPageLoad();
    }

    /**
     * Searches for employees with no filters
     */
    async searchEmployeesWithNoFilter(){
        await this.clickElement(this.resetButton);
        await this.clickElement(this.searchButton);
        await this.waitForPageLoad();
    }

    /**
     * Checks the number of employees found
     * @param count - The expected count ("0", "1", or any other value for multiple)
     */
    async checkNumberOfEmployees(count:string){
        // Wait for the records count to be updated
        await this.waitForElement(this.noOfRecords);
        
        if(count === "1"){
            await this.expectToContainText(this.noOfRecords, "(1) Record Found", "Should show 1 record found");
        }else if(count === "0"){
            await this.expectToContainText(this.noOfRecords, "No Records Found", "Should show no records found");
        }else{
            await this.expectToContainText(this.noOfRecords, "Records Found", "Should show multiple records found");
        }
    }

    /**
     * Clicks the Add button to navigate to the Add Employee page
     */
    async addEmployee(){
        await this.clickElement(this.addButton);
        await this.waitForPageLoad();
    }

    /**
     * Gets the details of the first employee in the list
     */
    async getEmployeeDetail(){
        await this.clickElement(this.firstEmployee);
        await this.expectToBeVisible(this.getDetail, "Employee detail should be visible");
    }

    /**
     * Deletes the first employee in the list
     */
    async deleteEmployee() {
        await this.clickElement(this.delete);
        // Wait for the confirmation dialog
        await this.page.waitForSelector('.oxd-dialog-container', { state: 'visible' });
        // Click the Yes, Delete button
        await this.clickElement(this.page.getByRole('button', { name: 'Yes, Delete' }));
        await this.waitForPageLoad();
    }

    /**
     * Edits the first employee in the list
     */
    async editEmployee() {
        await this.clickElement(this.editOption);
        // Wait for the edit page to load
        await this.waitForPageLoad();
        
        // Edit nationality
        await this.clickElement(this.page.locator('.oxd-select-text').first());
        await this.clickElement(this.page.getByRole('option', { name: 'Indian' }));
        
        // Edit gender
        await this.clickElement(this.page.getByText('Male', { exact: true }));
        
        // Save changes
        await this.clickElement(this.page.getByRole('button', { name: 'Save' }).first());
        await this.waitForPageLoad();
    }
}
