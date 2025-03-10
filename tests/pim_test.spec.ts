import { test } from '../fixtures/auth-fixture';
import { EmployeeListPage } from '../pages/PimPage/EmployeeListPage';
import { HomePage } from '../pages/HomePage';
import { AddEmployeePage } from '../pages/PimPage/AddEmployeePage';

/**
 * Tests for searching employees with different filters
 */
test.describe('Employee Search Tests', () => {
    test('Search Employee With No filter', async({ loggedInPage })=>{
        const homePage = new HomePage(loggedInPage);
        const employeeListPage = new EmployeeListPage(loggedInPage);

        await homePage.clickOnPimModule();
        await employeeListPage.searchEmployeesWithNoFilter();
        await employeeListPage.checkNumberOfEmployees("109");
    });

    test('Filter Such that No Employees are there', async({ loggedInPage })=>{
        const homePage = new HomePage(loggedInPage);
        const employeeListPage = new EmployeeListPage(loggedInPage);

        await homePage.clickOnPimModule();
        await employeeListPage.searchEmployeesWithOneFilterEmployeeName("l12345643uckyhjkloij");
        await employeeListPage.checkNumberOfEmployees("0");
    });

    test('Filter Such that One Employee is there', async({ loggedInPage })=>{
        const homePage = new HomePage(loggedInPage);
        const employeeListPage = new EmployeeListPage(loggedInPage);

        await homePage.clickOnPimModule();
        await employeeListPage.searchEmployeesWithMultipleFilters();
        await employeeListPage.checkNumberOfEmployees("1");
    });
});

/**
 * Tests for adding employees with different configurations
 */
test.describe('Employee Addition Tests', () => {
    test('Add an employee Without Photo and Login Details', async({ loggedInPage })=>{
        const homePage = new HomePage(loggedInPage);
        const addEmployeePage = new AddEmployeePage(loggedInPage);
        const employeeListPage = new EmployeeListPage(loggedInPage);

        await homePage.clickOnPimModule();
        await employeeListPage.addEmployee();
        await addEmployeePage.addEmployeeWithoutPhotoAndLoginDetails("vivek","kumar","verma");    
    });

    test('Add an employee Without Login Details', async({ loggedInPage })=>{
        const homePage = new HomePage(loggedInPage);
        const addEmployeePage = new AddEmployeePage(loggedInPage);
        const employeeListPage = new EmployeeListPage(loggedInPage);

        await homePage.clickOnPimModule();
        await employeeListPage.addEmployee();
        await addEmployeePage.addEmployeeWithoutLoginDetails("vaibhav","kumar","verma");    
    });

    test('Add an employee with all the details', async({ loggedInPage })=>{
        const homePage = new HomePage(loggedInPage);
        const addEmployeePage = new AddEmployeePage(loggedInPage);
        const employeeListPage = new EmployeeListPage(loggedInPage);

        await homePage.clickOnPimModule();
        await employeeListPage.addEmployee();
        await addEmployeePage.addEmployeeWithAllDetails("vishal","kumar","verma");    
    });
});

/**
 * Tests for employee management operations
 */
test.describe('Employee Management Tests', () => {
    test('Get Employee Detail', async({ loggedInPage })=>{
        const homePage = new HomePage(loggedInPage);
        const employeeListPage = new EmployeeListPage(loggedInPage);

        await homePage.clickOnPimModule();
        await employeeListPage.searchEmployeesWithNoFilter();
        await employeeListPage.getEmployeeDetail();
    });

    test('Delete Employee', async({ loggedInPage })=>{
        const homePage = new HomePage(loggedInPage);
        const employeeListPage = new EmployeeListPage(loggedInPage);

        await homePage.clickOnPimModule();
        await employeeListPage.searchEmployeesWithNoFilter();
        await employeeListPage.deleteEmployee();
    });

    test('Edit Basic Employee Details', async({ loggedInPage })=>{
        const homePage = new HomePage(loggedInPage);
        const employeeListPage = new EmployeeListPage(loggedInPage);

        await homePage.clickOnPimModule();
        await employeeListPage.searchEmployeesWithNoFilter();
        await employeeListPage.editEmployee();
    });
});
