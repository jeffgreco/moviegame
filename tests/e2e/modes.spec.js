import { test, expect } from '@playwright/test';

test.describe('Game Modes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    // Wait for JavaScript to execute - the draw pile will have a card when game is ready
    await page.waitForSelector('#draw-pile .movie-card, #welcome-modal:not(.hidden)', { timeout: 15000 });
    // Close welcome modal if visible
    const welcomeModal = page.locator('#welcome-modal:not(.hidden)');
    if (await welcomeModal.isVisible().catch(() => false)) {
      await page.locator('#welcome-start').click();
      await page.waitForSelector('#draw-pile .movie-card', { timeout: 5000 });
    }
  });

  test('should default to random mode', async ({ page }) => {
    const randomBtn = page.locator('#random-mode-btn');
    await expect(randomBtn).toHaveClass(/active/);
  });

  test('should switch to daily mode', async ({ page }) => {
    const dailyBtn = page.locator('#daily-mode-btn');
    await dailyBtn.click();

    await expect(dailyBtn).toHaveClass(/active/);

    const randomBtn = page.locator('#random-mode-btn');
    await expect(randomBtn).not.toHaveClass(/active/);
  });

  test('should switch back to random mode', async ({ page }) => {
    // Switch to daily first
    await page.locator('#daily-mode-btn').click();

    // Switch back to random
    const randomBtn = page.locator('#random-mode-btn');
    await randomBtn.click();

    await expect(randomBtn).toHaveClass(/active/);
  });

  test('should open help modal', async ({ page }) => {
    // Open dropdown menu
    await page.locator('.logo-trigger').click();

    // Click help
    await page.locator('#menu-help').click();

    // Help modal should be visible
    await expect(page.locator('#help-modal')).toBeVisible();
  });

  test('should close help modal', async ({ page }) => {
    await page.locator('.logo-trigger').click();
    await page.locator('#menu-help').click();

    await expect(page.locator('#help-modal')).toBeVisible();

    // Close help modal via JavaScript to avoid decorative SVG interference
    await page.evaluate(() => document.getElementById('help-close').click());

    await expect(page.locator('#help-modal')).toHaveClass(/hidden/);
  });

  test('should open archive modal', async ({ page }) => {
    await page.locator('.logo-trigger').click();
    await page.locator('#menu-archive').click();

    await expect(page.locator('#archive-modal')).toBeVisible();
  });

  test('should close archive modal', async ({ page }) => {
    await page.locator('.logo-trigger').click();
    await page.locator('#menu-archive').click();

    await expect(page.locator('#archive-modal')).toBeVisible();

    // Close archive modal via JavaScript to avoid decorative SVG interference
    await page.evaluate(() => document.getElementById('archive-close').click());

    await expect(page.locator('#archive-modal')).toHaveClass(/hidden/);
  });

  test('should show archive puzzles list', async ({ page }) => {
    await page.locator('.logo-trigger').click();
    await page.locator('#menu-archive').click();

    // Should have archive items or empty message
    const archiveList = page.locator('#archive-list');
    await expect(archiveList).toBeVisible();

    // Either has items or shows empty message
    const hasContent =
      (await page.locator('.archive-item').count()) > 0 ||
      (await page.locator('.archive-empty').count()) > 0;
    expect(hasContent).toBe(true);
  });

  test('should load archive puzzle when clicked', async ({ page }) => {
    await page.locator('.logo-trigger').click();
    await page.locator('#menu-archive').click();

    const archiveItems = page.locator('.archive-item');
    if ((await archiveItems.count()) > 0) {
      await archiveItems.first().click();

      // Archive modal should close
      await expect(page.locator('#archive-modal')).toBeHidden();

      // URL should have puzzle parameter
      await expect(page).toHaveURL(/puzzle=/);
    }
  });
});

test.describe('Challenge Mode', () => {
  test('should load challenge from URL parameter', async ({ page }) => {
    // Create a simple challenge URL (score=5, movieIds=[1,2,3,4,5])
    // Encoded: "5,603692,324857,447365,436969,522627" -> base64
    const challengeData = btoa('5,603692,324857,447365,436969,522627');
    const urlSafeData = challengeData
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    await page.goto(`/?c=${urlSafeData}`);
    await page.waitForLoadState('domcontentloaded');

    // Close welcome if shown
    const welcomeModal = page.locator('#welcome-modal');
    if (await welcomeModal.isVisible({ timeout: 5000 }).catch(() => false)) {
      await page.locator('#welcome-start').click();
    }

    // Challenge indicator should be visible
    const challengeIndicator = page.locator('#challenge-indicator');
    await expect(challengeIndicator).toBeVisible({ timeout: 10000 });
    await expect(challengeIndicator).toContainText('Beat 5 to win');
  });

  test('should show share button after game over in random mode', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    const startButton = page.locator('#welcome-start');
    await expect(startButton).toBeVisible({ timeout: 10000 });
    await startButton.click();

    // Make sure we're in random mode
    await page.locator('#random-mode-btn').click();

    // Play until game over
    let attempts = 0;
    while (attempts < 20 && !(await page.locator('#game-over').isVisible())) {
      const dropZones = page.locator('#timeline .drop-zone');
      if ((await dropZones.count()) > 0) {
        await dropZones.first().click();
        await page.waitForTimeout(700);
      }
      attempts++;
    }

    // Share button should be visible
    await expect(page.locator('#share-score')).toBeVisible();
  });

  test('should show challenge button in random mode game over', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    const startButton = page.locator('#welcome-start');
    await expect(startButton).toBeVisible({ timeout: 10000 });
    await startButton.click();
    await page.locator('#random-mode-btn').click();

    // Play until game over
    let attempts = 0;
    while (attempts < 20 && !(await page.locator('#game-over').isVisible())) {
      const dropZones = page.locator('#timeline .drop-zone');
      if ((await dropZones.count()) > 0) {
        await dropZones.first().click();
        await page.waitForTimeout(700);
      }
      attempts++;
    }

    // Challenge button should be visible for random mode
    await expect(page.locator('#copy-challenge')).toBeVisible();
  });
});
