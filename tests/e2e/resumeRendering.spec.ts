import { test, expect } from '@playwright/test';

/**
 * E2E tests for Typst resume rendering
 * These tests verify that the actual Typst WASM compiler
 * can render resumes without errors
 */

test.describe('Resume Rendering E2E', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the builder page
        await page.goto('/builder');

        // Wait for Typst to be ready (the preview should load)
        await page.waitForSelector('[data-testid="resume-preview"]', {
            timeout: 30000,
            state: 'visible',
        }).catch(() => {
            // If no data-testid, wait for any preview content
        });

        // Wait for Typst WASM to load
        await page.waitForFunction(() => {
            return window.$typst !== undefined;
        }, { timeout: 30000 });
    });

    test('should render empty resume without errors', async ({ page }) => {
        // Check that the page loaded without console errors
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Wait a bit for any async errors
        await page.waitForTimeout(2000);

        // Filter out non-critical errors
        const criticalErrors = errors.filter(
            e => e.includes('SourceDiagnostic') || e.includes('Typst') || e.includes('expected expression'),
        );

        expect(criticalErrors).toHaveLength(0);
    });

    test('should render resume with C# in project title', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Add a project with C# in the title
        // First, expand the projects section if collapsed
        const projectsSection = page.locator('text=Projects').first();
        if (await projectsSection.isVisible()) {
            await projectsSection.click();
        }

        // Find and fill the project title input
        const projectTitleInput = page.locator('input[placeholder*="Project"]').first();
        if (await projectTitleInput.isVisible()) {
            await projectTitleInput.fill('My C# Application');
            await page.waitForTimeout(1000);
        }

        // Check for Typst compilation errors
        const typstErrors = errors.filter(
            e => e.includes('SourceDiagnostic') || e.includes('expected expression'),
        );

        expect(typstErrors).toHaveLength(0);
    });

    test('should render resume with special characters in skills', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Find skills section
        const skillsSection = page.locator('text=Skills').first();
        if (await skillsSection.isVisible()) {
            await skillsSection.click();
        }

        // Add skill with special characters
        const skillInput = page.locator('input[placeholder*="Skill"]').first();
        if (await skillInput.isVisible()) {
            await skillInput.fill('C#, F#, TypeScript, $100K projects');
            await page.waitForTimeout(1000);
        }

        const typstErrors = errors.filter(
            e => e.includes('SourceDiagnostic') || e.includes('expected expression'),
        );

        expect(typstErrors).toHaveLength(0);
    });

    test('should render resume with monetary values', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Add experience with $ signs
        const expSection = page.locator('text=Experience').first();
        if (await expSection.isVisible()) {
            await expSection.click();
        }

        // Look for achievement input and add monetary value
        const achievementInput = page.locator('textarea[placeholder*="achievement"], input[placeholder*="achievement"]').first();
        if (await achievementInput.isVisible()) {
            await achievementInput.fill('Saved $50,000 annually through process optimization');
            await page.waitForTimeout(1000);
        }

        const typstErrors = errors.filter(
            e => e.includes('SourceDiagnostic') || e.includes('expected expression'),
        );

        expect(typstErrors).toHaveLength(0);
    });

    test('should render resume with quotes in content', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Fill summary with quotes
        const summaryInput = page.locator('textarea[placeholder*="summary"], textarea[placeholder*="Summary"]').first();
        if (await summaryInput.isVisible()) {
            await summaryInput.fill('Led "Project Alpha" to success with "agile" methodology');
            await page.waitForTimeout(1000);
        }

        const typstErrors = errors.filter(
            e => e.includes('SourceDiagnostic') || e.includes('expected expression'),
        );

        expect(typstErrors).toHaveLength(0);
    });

    test('should render resume with brackets and special markup', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Fill position with brackets
        const positionInput = page.locator('input[placeholder*="position"], input[placeholder*="Position"]').first();
        if (await positionInput.isVisible()) {
            await positionInput.fill('Senior Developer [Remote]');
            await page.waitForTimeout(1000);
        }

        const typstErrors = errors.filter(
            e => e.includes('SourceDiagnostic') || e.includes('expected expression'),
        );

        expect(typstErrors).toHaveLength(0);
    });

    test('should generate PDF without errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Fill some basic data
        const firstNameInput = page.locator('input[placeholder*="First"]').first();
        if (await firstNameInput.isVisible()) {
            await firstNameInput.fill('John');
        }

        const lastNameInput = page.locator('input[placeholder*="Last"]').first();
        if (await lastNameInput.isVisible()) {
            await lastNameInput.fill('Doe');
        }

        await page.waitForTimeout(1000);

        // Try to trigger PDF generation via the download button
        const downloadButton = page.locator('button:has-text("Download"), button:has-text("PDF")').first();
        if (await downloadButton.isVisible()) {
            // Set up download handler
            const _downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);

            await downloadButton.click();
            await page.waitForTimeout(2000);

            // Check for errors during PDF generation
            const pdfErrors = errors.filter(
                e => e.includes('PDF generation error') || e.includes('SourceDiagnostic'),
            );

            expect(pdfErrors).toHaveLength(0);
        }
    });
});

test.describe('Template Switching', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/builder');
        await page.waitForFunction(() => window.$typst !== undefined, { timeout: 30000 });
    });

    test('should switch between templates without errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Look for template selector
        const templateSelector = page.locator('select[name*="template"], [data-testid="template-selector"]').first();

        if (await templateSelector.isVisible()) {
            // Switch to compact template
            await templateSelector.selectOption('compact');
            await page.waitForTimeout(1000);

            // Switch back to default
            await templateSelector.selectOption('default');
            await page.waitForTimeout(1000);
        }

        const typstErrors = errors.filter(
            e => e.includes('SourceDiagnostic') || e.includes('expected expression'),
        );

        expect(typstErrors).toHaveLength(0);
    });
});

test.describe('Complex Resume Scenarios', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/builder');
        await page.waitForFunction(() => window.$typst !== undefined, { timeout: 30000 });
    });

    test('should render resume with all special characters combined', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        // Fill multiple fields with special characters
        const fields = [
            { selector: 'input[placeholder*="First"]', value: 'John#Test' },
            { selector: 'input[placeholder*="Last"]', value: 'Doe$User' },
            { selector: 'input[placeholder*="position"], input[placeholder*="Position"]', value: 'C# Developer [Senior]' },
        ];

        for (const field of fields) {
            const input = page.locator(field.selector).first();
            if (await input.isVisible()) {
                await input.fill(field.value);
            }
        }

        await page.waitForTimeout(2000);

        const typstErrors = errors.filter(
            e => e.includes('SourceDiagnostic') || e.includes('expected expression') || e.includes('unexpected'),
        );

        expect(typstErrors).toHaveLength(0);
    });

    test('should handle rapid input changes without errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        const firstNameInput = page.locator('input[placeholder*="First"]').first();

        if (await firstNameInput.isVisible()) {
            // Rapid changes
            for (const name of ['A', 'Ab', 'Abc', 'C#', 'C# Dev', 'Final Name']) {
                await firstNameInput.fill(name);
                await page.waitForTimeout(100);
            }
        }

        await page.waitForTimeout(2000);

        const typstErrors = errors.filter(
            e => e.includes('SourceDiagnostic') || e.includes('expected expression'),
        );

        expect(typstErrors).toHaveLength(0);
    });
});
