import { Page, expect } from '@playwright/test';
import userdata from '../userdata.json';

export class PurchasePage {
  private page: Page; // Locators
  private loginLink;
  private emailInput;
  private passwordInput;
  private loginButton;
  private jewelryLink;
  private blackWhiteDiamondLink;
  private addToCartButton;
  private closePopupButton;
  private electronicsLink;
  private cellPhonesLink;
  private phoneCoverLink;
  private brandDropdown;
  private colorDropdown;
  private shoppingCartLink;
  private termsOfServiceCheckbox;
  private checkoutButton;
  private continueButtons;
  private confirmOrderButton;
  private successMessage;

  constructor(page: Page) {
    this.page = page;

    this.loginLink = this.page.getByRole('link', { name: 'Log in' });
    this.emailInput = this.page.getByLabel('Email:');
    this.passwordInput = this.page.getByLabel('Password:');
    this.loginButton = this.page.getByRole('button', { name: 'Log in' });
    this.jewelryLink = this.page.getByRole('link', { name: 'Jewelry' }).first();
    this.blackWhiteDiamondLink = this.page.getByRole('link', { name: 'Black & White Diamond Heart', exact: true });
    this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    this.closePopupButton = this.page.getByTitle('Close');
    this.electronicsLink = this.page.getByRole('link', { name: 'Electronics' }).first();
    this.cellPhonesLink = this.page.getByRole('heading', { name: 'Cell phones' }).getByRole('link');
    this.phoneCoverLink = this.page.getByRole('link', { name: 'Phone Cover', exact: true });
    this.brandDropdown = this.page.locator('select[id="product_attribute_80_2_37"]');
    this.colorDropdown = this.page.locator('select[id="product_attribute_80_1_38"]');
    this.shoppingCartLink = this.page.getByRole('link', { name: 'Shopping cart' }).first();
    this.termsOfServiceCheckbox = this.page.locator('#termsofservice');
    this.checkoutButton = this.page.locator('.checkout-buttons');
    this.continueButtons = this.page.locator('//input[@value="Continue"]');
    this.confirmOrderButton = this.page.getByRole('button', { name: 'Confirm' });
    this.successMessage = this.page.locator('text=Your order has been successfully processed!');
  }
  
  async navigateToLogin(): Promise<void> {
    await this.page.goto('https://demowebshop.tricentis.com/');
    await this.loginLink.click();
    await this.emailInput.fill(userdata.user.email);
    await this.passwordInput.fill(userdata.user.password);
    await this.loginButton.click();
  }

  async addJewelryToCart(): Promise<void> {
    await this.jewelryLink.click();
    await this.blackWhiteDiamondLink.click();
    await this.addToCartButton.click();
    await this.closePopupButton.click();
  }

  async addPhoneCoverToCart(products: { brand: string; color: string }[]): Promise<void> {
    await this.electronicsLink.click();
    await this.cellPhonesLink.click();
    await this.phoneCoverLink.click();

    for (const product of products) {
      await this.brandDropdown.selectOption(product.brand);
      await this.colorDropdown.selectOption(product.color);
      await this.page.locator('#add-to-cart-button-80').click();
      expect(await this.page.waitForSelector('text=The product has been added to your shopping cart', { state: 'visible' })).toBeTruthy();
    }
  }

  async completePurchase(): Promise<void> {
    await this.shoppingCartLink.click();
    await this.termsOfServiceCheckbox.check();
    await this.checkoutButton.click();

    for (let i = 0; i < 5; i++) {
      await this.continueButtons.nth(i).click();
    }
    await this.confirmOrderButton.click();
    await expect(this.successMessage).toBeVisible();
  }
}