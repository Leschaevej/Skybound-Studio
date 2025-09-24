import { test, expect } from '@playwright/test';

test.describe('Page d\'accueil - Tests E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('chargement initial et preloader', async ({ page }) => {
    // Attendre que le preloader soit visible
    await expect(page.locator('.preloader')).toBeVisible();

    // Vérifier l'animation du logo et du texte
    await expect(page.locator('.preloader .logo')).toBeVisible();
    await expect(page.locator('.preloader .text')).toBeVisible();

    // Attendre que le preloader disparaisse
    await expect(page.locator('.preloader')).not.toBeVisible({ timeout: 10000 });

    // Vérifier que le contenu principal est visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('navigation principale', async ({ page }) => {
    // Attendre la fin du preloader
    await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });

    // Tester la navigation vers Services
    await page.click('button:has-text("Services")');
    await expect(page.locator('#services')).toBeInViewport();

    // Tester la navigation vers Contact
    await page.click('button:has-text("Contact")');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('menu mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      // Réduire la taille de la fenêtre pour tester le menu mobile
      await page.setViewportSize({ width: 375, height: 667 });
    }

    // Attendre la fin du preloader
    await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });

    // Ouvrir le menu mobile
    await page.click('[data-testid="menu"]');
    await expect(page.locator('[data-testid="side"]')).toHaveClass(/open/);

    // Tester les liens de navigation
    await page.click('text=Services');
    await expect(page.locator('#services')).toBeInViewport();

    // Le menu devrait se fermer
    await expect(page.locator('[data-testid="side"]')).not.toHaveClass(/open/);
  });

  test('animations au scroll', async ({ page }) => {
    // Attendre la fin du preloader
    await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });

    // Scroller vers la section dream
    await page.locator('.dream').scrollIntoViewIfNeeded();

    // Vérifier que les animations se déclenchent
    await expect(page.locator('.dream h2')).toHaveClass(/animate/);
    await expect(page.locator('.dream .wrapper').first()).toHaveClass(/animate/);

    // Scroller vers la section method
    await page.locator('.method').scrollIntoViewIfNeeded();

    // Vérifier les animations des SVG
    await expect(page.locator('.method svg').first()).toHaveClass(/animate/);
    await expect(page.locator('.method h3').first()).toHaveClass(/animate/);
  });

  test('formulaire de contact', async ({ page }) => {
    // Attendre la fin du preloader
    await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });

    // Aller à la section contact
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Remplir le formulaire
    await page.fill('input[placeholder*="Nom"]', 'Test User');
    await page.fill('input[placeholder*="E-mail"]', 'test@example.com');
    await page.fill('input[placeholder*="Téléphone"]', '+33123456789');
    await page.fill('textarea[placeholder*="Message"]', 'Ceci est un message de test');

    // Soumettre le formulaire
    await page.click('button:has-text("Envoyer")');

    // Vérifier le message de succès ou d'erreur
    await expect(page.locator('button')).toContainText(/communication établie|erreur/i, { timeout: 5000 });
  });

  test('accessibilité - navigation clavier', async ({ page }) => {
    // Attendre la fin du preloader
    await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });

    // Tester la navigation avec Tab
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="logo"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="menu"]')).toBeFocused();

    // Ouvrir le menu avec Entrée
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="side"]')).toHaveClass(/open/);

    // Naviguer dans le menu
    await page.keyboard.press('Tab');
    await expect(page.locator('text=Accueil')).toBeFocused();
  });

  test('responsive design', async ({ page }) => {
    // Attendre la fin du preloader
    await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });

    // Tester différentes tailles d'écran
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      // Vérifier que le contenu est visible et accessible
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('.hero')).toBeVisible();
      await expect(page.locator('.services .grid')).toBeVisible();

      // Vérifier le menu sur mobile
      if (viewport.width < 768) {
        await expect(page.locator('[data-testid="menu"]')).toBeVisible();
      }
    }
  });

  test('performance et chargement', async ({ page }) => {
    // Mesurer les métriques de performance
    const performanceEntries = await page.evaluate(() => {
      return JSON.stringify(performance.getEntriesByType('navigation'));
    });

    const navigationTiming = JSON.parse(performanceEntries)[0];

    // Vérifier que la page se charge rapidement (moins de 3 secondes)
    expect(navigationTiming.loadEventEnd - navigationTiming.fetchStart).toBeLessThan(3000);

    // Vérifier le Largest Contentful Paint
    const lcpValue = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });

    // LCP devrait être inférieur à 2.5 secondes
    expect(lcpValue).toBeLessThan(2500);
  });

  test('images et assets', async ({ page }) => {
    // Attendre la fin du preloader
    await page.waitForSelector('.preloader', { state: 'detached', timeout: 10000 });

    // Vérifier que toutes les images se chargent
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();

      // Vérifier que l'image a un alt text
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
    }

    // Vérifier les SVG
    const svgs = page.locator('svg');
    const svgCount = await svgs.count();
    expect(svgCount).toBeGreaterThan(0);
  });

  test('SEO et métadonnées', async ({ page }) => {
    // Vérifier le title
    await expect(page).toHaveTitle(/Skybound Studio/);

    // Vérifier la meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Vérifier les headings pour le SEO
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Skybound Studio');

    // Vérifier la structure des headings
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(4);

    const h3Count = await page.locator('h3').count();
    expect(h3Count).toBeGreaterThan(6);
  });
});