import { test, expect } from '@playwright/test';
import fs from 'fs'

test('Remove session file', async ({ page }) => {
    const sessionFilePath = './session.json';
    try {
        await fs.promises.unlink(sessionFilePath);
    } catch (error) {
        console.error(`Error deleting file: ${error}`);
    }
});