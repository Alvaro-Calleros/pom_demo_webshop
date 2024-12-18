import { test } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { PurchasePage } from '../pages/purchasePage';
import { LoginPage } from '../pages/loginPage'
import userdata from '../userdata.json';

test.describe('User Registration Tests', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigateToRegisterPage();
  });

  test('TC01_Register_SuccessfulUniqueEmail', async () => {
    await registerPage.fillRegistrationForm(true); // true para email unico
    await registerPage.submitRegistration();
    await registerPage.expectRegistrationSuccess();
  });

  test('TC02_Register_FailureDuplicateEmail', async () => {
    await registerPage.fillRegistrationForm(false); // false para email repetido
    await registerPage.submitRegistration();
    await registerPage.expectRegistrationError();
  });
});

test('TC03_Simple_SuccessfulLogin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login(userdata.user.email, userdata.user.password);
  await loginPage.verifySuccessfulLogin(userdata.user.email);
});

test('TC04_Login_PasswordRecovery', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.recoverPassword(userdata.user.email);
  await loginPage.verifyPasswordRecovery();
});

test('TC05_Purchase_AddJewelryAndPhoneCovers', async ({ page }) => {
  const purchasePage = new PurchasePage(page);
  const products = [
    { brand: 'Apple', color: 'White' },
    { brand: 'Apple', color: 'Black' },
    { brand: 'Apple', color: 'Blue' },
    { brand: 'Apple', color: 'Yellow' },
    { brand: 'Samsung', color: 'White' },
    { brand: 'Samsung', color: 'Black' },
    { brand: 'Samsung', color: 'Blue' },
    { brand: 'Samsung', color: 'Yellow' },
  ];
  await purchasePage.navigateToLogin();
  await purchasePage.addJewelryToCart();
  await purchasePage.addPhoneCoverToCart(products);
  await purchasePage.completePurchase();
});