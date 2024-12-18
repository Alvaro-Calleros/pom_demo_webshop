import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('https://demowebshop.tricentis.com/');
    await this.page.getByRole('link', { name: 'Log in' }).click();
  }

  async login(email: string, password: string) {
    await this.page.getByLabel('Email:').click();
    await this.page.getByLabel('Email:').fill(email);
    await this.page.getByLabel('Password:').click();
    await this.page.getByLabel('Password:').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async verifySuccessfulLogin(email: string) {
    const successReference = await this.page.locator(`text=${email}`);
    await expect(successReference).toBeVisible();
  }

  async recoverPassword(email: string) {
    await this.page.getByRole('link', { name: 'Forgot password?' }).click();
    await this.page.getByLabel('Your email address:').click();
    await this.page.getByLabel('Your email address:').fill(email);
    await this.page.getByRole('button', { name: 'Recover' }).click();
  }

  async verifyPasswordRecovery() {
    const recoveryReference = await this.page.locator('text=Email with instructions has been sent to you.');
    await expect(recoveryReference).toBeVisible();
  }
}