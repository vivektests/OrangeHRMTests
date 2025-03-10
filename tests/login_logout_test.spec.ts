import { test as baseTest } from '@playwright/test';
import logintestData from '../test-data/loginTestData.json';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

/**
 * Interface for login test data
 */
interface LoginCredential {
    username: string;
    password: string;
    testType: 'Positive' | 'Negative';
}

/**
 * Interface for the test data structure
 */
interface TestData {
    ValidUsernamePassword: LoginCredential;
    CaseInsensitiveCheck: LoginCredential;
    InvalidPassword: LoginCredential;
    EmptyPassword: LoginCredential;
    EmptyUsername: LoginCredential;
    EmptyUsernamePassword: LoginCredential;
    [key: string]: LoginCredential; // Index signature for dynamic access
}


// Cast the imported JSON to our TypeScript interface
const loginData = logintestData as TestData;

// Regular test for login scenarios
const test = baseTest;

/**
 * Tests for login with different credentials
 */
test.describe('Login Tests', () => {
    for(const loginCredential in loginData){
        const credential = loginData[loginCredential];
        
        test(`Login Test With Username: ${credential.username} and Password: ${credential.password}`, async({page})=>{
            const loginPage = new LoginPage(page);
            await loginPage.visit();
            await loginPage.login(credential.username, credential.password);
            await loginPage.loginValidation(credential.username, credential.password, credential.testType);
        });
    }
});

/**
 * Test for logout functionality
 */
test.describe('Logout Tests', () => {
    test('Logout Test', async( {page} )=>{
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.login("Admin","admin123");
        await homePage.logout();
        await homePage.logoutValidation();
    });
});
