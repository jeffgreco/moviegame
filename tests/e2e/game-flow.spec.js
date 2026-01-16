import { test, expect } from '@playwright/test';

test.describe('Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to simulate fresh visit
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    // Wait for JavaScript to execute - the draw pile will have a card when game is ready
    await page.waitForSelector('#draw-pile .movie-card, #welcome-modal:not(.hidden)', { timeout: 15000 });
  });

  test('should show welcome modal on first visit', async ({ page }) => {
    const welcomeModal = page.locator('#welcome-modal:not(.hidden)');
    await expect(welcomeModal).toBeVisible();
    await expect(welcomeModal).toContainText('Welcome to Filmstrip');
  });

  test('should close welcome modal and start game', async ({ page }) => {
    const welcomeModal = page.locator('#welcome-modal');
    const startButton = page.locator('#welcome-start');

    await expect(welcomeModal).not.toHaveClass(/hidden/);
    await startButton.click();
    await expect(welcomeModal).toHaveClass(/hidden/);
  });

  test('should display game elements after closing welcome', async ({ page }) => {
    const startButton = page.locator('#welcome-start');
    await startButton.click();

    // Check main game elements are visible
    await expect(page.locator('#draw-pile')).toBeVisible();
    await expect(page.locator('#timeline')).toBeVisible();
    await expect(page.locator('#score')).toBeVisible();
  });

  test('should have a movie card in draw pile', async ({ page }) => {
    await page.locator('#welcome-start').click();

    const drawPileCard = page.locator('#draw-pile .movie-card');
    await expect(drawPileCard).toBeVisible();
  });

  test('should have initial movie in timeline', async ({ page }) => {
    await page.locator('#welcome-start').click();

    const timelineCards = page.locator('#timeline .movie-card');
    await expect(timelineCards).toHaveCount(1);
  });

  test('should show drop zones for placement', async ({ page }) => {
    await page.locator('#welcome-start').click();

    // With one card in timeline, there should be 2 drop zones (before and after)
    const dropZones = page.locator('#timeline .drop-zone');
    await expect(dropZones).toHaveCount(2);
  });

  test('should place card when clicking drop zone', async ({ page }) => {
    await page.locator('#welcome-start').click();

    // Get initial state
    const initialTimelineCards = await page.locator('#timeline .movie-card').count();
    expect(initialTimelineCards).toBe(1);

    // Click a drop zone to place the card
    const dropZone = page.locator('#timeline .drop-zone').first();
    await dropZone.click();

    // Wait for animation
    await page.waitForTimeout(600);

    // Check if card was placed (timeline now has 2 cards)
    // Note: The card might be correct or incorrect, but it should attempt placement
    const gameOver = page.locator('#game-over');
    const timelineAfter = await page.locator('#timeline .movie-card').count();

    // Either game ended (wrong placement) or card was added (correct placement)
    const isGameOver = await gameOver.isVisible();
    if (!isGameOver) {
      expect(timelineAfter).toBe(2);
    }
  });

  test('should update score on correct placement', async ({ page }) => {
    await page.locator('#welcome-start').click();

    const scoreEl = page.locator('#score');
    const initialScore = await scoreEl.textContent();

    // Place multiple cards and check if score can increase
    // (depends on whether placements are correct)
    const dropZones = page.locator('#timeline .drop-zone');
    await dropZones.first().click();

    await page.waitForTimeout(600);

    const newScore = await scoreEl.textContent();
    // Score either increased (correct) or game ended (wrong)
    const gameOver = page.locator('#game-over');
    if (!(await gameOver.isVisible())) {
      expect(parseInt(newScore)).toBeGreaterThanOrEqual(parseInt(initialScore));
    }
  });

  test('should show game over modal when game ends', async ({ page }) => {
    await page.locator('#welcome-start').click();

    // Keep placing cards until game ends
    let attempts = 0;
    while (attempts < 20) {
      const gameOver = page.locator('#game-over');
      if (await gameOver.isVisible()) {
        break;
      }

      const dropZones = page.locator('#timeline .drop-zone');
      const count = await dropZones.count();
      if (count > 0) {
        // Alternate between first and last drop zones to eventually get wrong
        const zoneIndex = attempts % 2 === 0 ? 0 : count - 1;
        await dropZones.nth(zoneIndex).click();
        await page.waitForTimeout(700);
      }
      attempts++;
    }

    // Game should eventually end
    const gameOver = page.locator('#game-over');
    await expect(gameOver).toBeVisible({ timeout: 10000 });
  });

  test('should show final score in game over modal', async ({ page }) => {
    await page.locator('#welcome-start').click();

    // Force game to end by clicking drop zones
    let attempts = 0;
    while (attempts < 20 && !(await page.locator('#game-over').isVisible())) {
      const dropZones = page.locator('#timeline .drop-zone');
      if ((await dropZones.count()) > 0) {
        await dropZones.first().click();
        await page.waitForTimeout(700);
      }
      attempts++;
    }

    await expect(page.locator('#game-over')).toBeVisible();

    // Check for score display (either #final-score or #puzzle-stats)
    const hasScore =
      (await page.locator('#final-score').isVisible()) ||
      (await page.locator('#puzzle-stats').isVisible());
    expect(hasScore).toBe(true);
  });

  test('should have play again button in game over', async ({ page }) => {
    await page.locator('#welcome-start').click();

    // End the game
    let attempts = 0;
    while (attempts < 20 && !(await page.locator('#game-over').isVisible())) {
      const dropZones = page.locator('#timeline .drop-zone');
      if ((await dropZones.count()) > 0) {
        await dropZones.first().click();
        await page.waitForTimeout(700);
      }
      attempts++;
    }

    await expect(page.locator('#play-again')).toBeVisible();
  });

  test('should restart game when clicking play again', async ({ page }) => {
    await page.locator('#welcome-start').click();

    // End the game
    let attempts = 0;
    while (attempts < 20 && !(await page.locator('#game-over').isVisible())) {
      const dropZones = page.locator('#timeline .drop-zone');
      if ((await dropZones.count()) > 0) {
        await dropZones.first().click();
        await page.waitForTimeout(700);
      }
      attempts++;
    }

    await page.locator('#play-again').click();

    // Game over should be hidden
    await expect(page.locator('#game-over')).toBeHidden();

    // Game should be reset
    await expect(page.locator('#draw-pile .movie-card')).toBeVisible();
  });
});
