import { Page, expect } from '@playwright/test';
import userdata from '../userdata.json';

export class RegisterPage {   // Locators
  private page: Page;
  private registerLink;
  private maleRadio;
  private firstNameInput;
  private lastNameInput;
  private emailInput;
  private passwordInput;
  private confirmPasswordInput;
  private registerButton;
  private successMessage;
  private errorMessage;

  constructor(page: Page) {
    this.page = page;

    this.registerLink = this.page.getByRole('link', { name: 'Register' });
    this.maleRadio = this.page.getByLabel('Male', { exact: true });
    this.firstNameInput = this.page.getByLabel('First name:');
    this.lastNameInput = this.page.getByLabel('Last name:');
    this.emailInput = this.page.getByLabel('Email:');
    this.passwordInput = this.page.getByLabel('Password:', { exact: true });
    this.confirmPasswordInput = this.page.getByLabel('Confirm password:');
    this.registerButton = this.page.getByRole('button', { name: 'Register' });
    this.successMessage = this.page.locator('text=Your registration completed');
    this.errorMessage = this.page.locator('text=The specified email already exists');
  }

  async navigateToRegisterPage(): Promise<void> {
    await this.page.goto('https://demowebshop.tricentis.com/');
    await this.registerLink.click();
  }

  async fillRegistrationForm(isUniqueEmail = true): Promise<void> {
    await this.maleRadio.check();
    await this.firstNameInput.fill(userdata.user.firstName);
    await this.lastNameInput.fill(userdata.user.lastName);
    const email = isUniqueEmail ? `${userdata.user.firstName.toLowerCase()}${Date.now()}@test.com`: userdata.user.email;
    await this.emailInput.fill(email);
    await this.passwordInput.fill(userdata.user.password);
    await this.confirmPasswordInput.fill(userdata.user.password);
  }

  async submitRegistration(): Promise<void> {
    await this.registerButton.click();
  }
  // Assertions
  async expectRegistrationSuccess(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async expectRegistrationError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}