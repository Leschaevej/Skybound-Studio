import { test, expect } from '@playwright/test';

test.describe('Page d\'accueil - Tests E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    test('chargement initial et preloader', async ({ page }) => {
        await expect(page.locator('.preloader')).toBeVisible();
        await expect(page.locator('.preloader .logo')).toBeVisible();
        await expect(page.locator('.preloader .text')).toBeVisible();
        await expect(page.locator('.preloader')).not.toBeVisible({ timeout: 10000 });
        await expect(page.locator('main')).toBeVisible();
    });
    test('navigation principale', async ({ page }) => {
        await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });
        await page.click('button:has-text("Services")');
        await expect(page.locator('#services')).toBeInViewport();
        await page.click('button:has-text("Contact")');
        await expect(page.locator('#contact')).toBeInViewport();
    });
    test('menu mobile', async ({ page, isMobile }) => {
        if (!isMobile) {
        await page.setViewportSize({ width: 375, height: 667 });
        }
        await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });
        await page.click('[data-testid="menu"]');
        await expect(page.locator('[data-testid="side"]')).toHaveClass(/open/);
        await page.click('text=Services');
        await expect(page.locator('#services')).toBeInViewport();
        await expect(page.locator('[data-testid="side"]')).not.toHaveClass(/open/);
    });
    test('animations au scroll', async ({ page }) => {
        await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });
        await page.locator('.dream').scrollIntoViewIfNeeded();
        await expect(page.locator('.dream h2')).toHaveClass(/animate/);
        await expect(page.locator('.dream .wrapper').first()).toHaveClass(/animate/);
        await page.locator('.method').scrollIntoViewIfNeeded();
        await expect(page.locator('.method svg').first()).toHaveClass(/animate/);
        await expect(page.locator('.method h3').first()).toHaveClass(/animate/);
    });
    test('formulaire de contact', async ({ page }) => {
        await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.fill('input[placeholder*="Nom"]', 'Test User');
        await page.fill('input[placeholder*="E-mail"]', 'test@example.com');
        await page.fill('input[placeholder*="Téléphone"]', '+33123456789');
        await page.fill('textarea[placeholder*="Message"]', 'Ceci est un message de test');
        await page.click('button:has-text("Envoyer")');
        await expect(page.locator('button')).toContainText(/communication établie|erreur/i, { timeout: 5000 });
    });
    test('accessibilité - navigation clavier', async ({ page }) => {
        await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-testid="logo"]')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-testid="menu"]')).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(page.locator('[data-testid="side"]')).toHaveClass(/open/);
        await page.keyboard.press('Tab');
        await expect(page.locator('text=Accueil')).toBeFocused();
    });
    test('responsive design', async ({ page }) => {
        await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });
        const viewports = [
        { width: 375, height: 667 },
        { width: 768, height: 1024 },
        { width: 1920, height: 1080 },
        ];
        for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('.hero')).toBeVisible();
        await expect(page.locator('.services .grid')).toBeVisible();
        if (viewport.width < 768) {
            await expect(page.locator('[data-testid="menu"]')).toBeVisible();
        }
        }
    });
    test('performance et chargement', async ({ page }) => {
        const performanceEntries = await page.evaluate(() => {
        return JSON.stringify(performance.getEntriesByType('navigation'));
        });
        const navigationTiming = JSON.parse(performanceEntries)[0];
        expect(navigationTiming.loadEventEnd - navigationTiming.fetchStart).toBeLessThan(3000);
        const lcpValue = await page.evaluate(() => {
        return new Promise((resolve) => {
            new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            setTimeout(() => resolve(0), 5000);
        });
        });
        expect(lcpValue).toBeLessThan(2500);
    });
    test('images et assets', async ({ page }) => {
        await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });
        const images = page.locator('img');
        const imageCount = await images.count();
        for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();
        const altText = await img.getAttribute('alt');
        expect(altText).toBeTruthy();
        }
        const svgs = page.locator('svg');
        const svgCount = await svgs.count();
        expect(svgCount).toBeGreaterThan(0);
    });
    test('SEO et métadonnées', async ({ page }) => {
        await expect(page).toHaveTitle(/Skybound Studio/);
        const metaDescription = page.locator('meta[name="description"]');
        await expect(metaDescription).toHaveAttribute('content', /.+/);
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('h1')).toContainText('Skybound Studio');
        const h2Count = await page.locator('h2').count();
        expect(h2Count).toBeGreaterThan(4);
        const h3Count = await page.locator('h3').count();
        expect(h3Count).toBeGreaterThan(6);
    });
});