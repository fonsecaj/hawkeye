import {test, expect} from '@playwright/test';

const routes = [
  { name: 'Google', url: 'https://www.google.com/' },
  { name: 'Playwright', url: 'https://playwright.dev/' }
] as const;

routes.forEach(route => {
  test.describe(route.name, () => {
    test.beforeEach(async ({page}) => {
      await page.goto(route.url);
    });
  
    test('should not changed', async ({page}) => {
      expect(await page.screenshot({ path: `screenshots/${route.name}.png`, fullPage: true })).toMatchSnapshot(`golden-${route.name}.png`, {threshold: 0.4});
    });
  });
});
