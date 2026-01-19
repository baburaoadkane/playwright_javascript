import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../actions/pages/common/login.page';
import loginData from '../../test-data/common/login.json';

const authFile = path.join(process.cwd(), '.auth/user.json');

setup('System | Login | Valid data -> Login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await setup.step('Navigate to login page', async () => {
        await loginPage.navigateTo('/');
    });

    await setup.step('Login with valid credentials', async () => {
        await loginPage.login(loginData.username, loginData.password);
    });

    await setup.step('Verify title should contain Enfinity', async () => {
        await expect(page).toHaveTitle(/Enfinity/, { message: 'Login failed.' });
    });

    await setup.step('Save authentication state', async () => {
        await page.context().storageState({ path: authFile });
    });

    await setup.step('Login Summary', async () => {
        console.info(`\n[LOGIN] User: ${loginData.username} | Time: ${new Date().toLocaleString('en-IN')}\n`);
    });
});