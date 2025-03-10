/**
 * Selectors for the Login page
 */
export const LoginPageSelectors = {
    USERNAME_INPUT: 'input[placeholder="Username"]',
    PASSWORD_INPUT: 'input[placeholder="Password"]',
    LOGIN_BUTTON: 'button[type="submit"]',
    REQUIRED_USERNAME: '//input[@name="username"]//parent::div//following-sibling::span',
    REQUIRED_PASSWORD: '//input[@name="password"]//parent::div//following-sibling::span',
    ALERT: '.oxd-alert-content-text',
    HOME_PAGE_HEADING: 'h6'
};

/**
 * Selectors for the Home page
 */
export const HomePageSelectors = {
    USER_PROFILE: '.oxd-userdropdown',
    LOGOUT_BUTTON: 'a:has-text("Logout")',
    PIM_BUTTON: 'a:has-text("PIM")'
};

/**
 * Selectors for the Employee List page
 */
export const EmployeeListSelectors = {
    EMPLOYEE_NAME_INPUT: 'input[placeholder="Type for hints..."]',
    EMPLOYEE_ID_INPUT: '.oxd-input--active',
    EMPLOYMENT_STATUS_DROPDOWN: '.oxd-select-text',
    SEARCH_BUTTON: 'button:has-text("Search")',
    RESET_BUTTON: 'button:has-text("Reset")',
    ADD_BUTTON: 'button:has-text(" Add")',
    RECORDS_COUNT: '.oxd-text.oxd-text--span',
    EMPLOYEE_ROW: '.oxd-table-card',
    DELETE_BUTTON: '.bi-trash',
    EDIT_BUTTON: '.bi-pencil-fill',
    EMPLOYEE_DETAIL: 'h6.--strong'
};

/**
 * Selectors for the Add Employee page
 */
export const AddEmployeeSelectors = {
    FIRST_NAME_INPUT: 'input[name="firstName"]',
    MIDDLE_NAME_INPUT: 'input[name="middleName"]',
    LAST_NAME_INPUT: 'input[name="lastName"]',
    CREATE_LOGIN_SWITCH: 'label span',
    USERNAME_INPUT: '//label[text()="Username"]//parent::div//following-sibling::div//input',
    PASSWORD_INPUT: 'input[type="password"]',
    SAVE_BUTTON: 'button:has-text("Save")',
    CANCEL_BUTTON: 'button:has-text("Cancel")',
    UPLOAD_PHOTO: '.bi-plus'
};
