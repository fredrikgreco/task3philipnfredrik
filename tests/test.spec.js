// Lägg till en anteckning och bekräfta att den visas på sidan.
// Lägg till en anteckning och bekräfta att sidan visar "1 item left". Kryssa sedan i anteckningen och bekräfta att sidan visar "0 items left".
// Lägg till 3 anteckningar, kryssa i en av dem och bekräfta att sidan visar "2 items left".

const { test, expect } = require('@playwright/test');

test('Add Note and check if it exists', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  const input = await page.locator('#new-todo');
  await input.fill('hej');

  await input.press('Enter');

  const todoList = await page.locator('#todoList');
  await page.waitForSelector('#todoList li');

  const liItems = await todoList.locator('li');
  expect(liItems.length).not.toBe(0);
});


test('Add Note, complete it, and check item count', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  const input = await page.locator('#new-todo');
  await input.fill('hej');

  await input.press('Enter');

  const itemsLeft = await page.locator('#todoCounter');
  expect(await itemsLeft.innerText()).toBe('1 items left');

  const checkbox = await page.locator('#todoList li input[type="checkbox"]');
  await checkbox.check();

  const itemsAfterComplete = await page.locator('#todoCounter');
  expect(await itemsAfterComplete.innerText()).toBe('0 items left');
});

test('Add 3 Notes, complete one, and check item count', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  const input = await page.locator('#new-todo');
  for (let i = 1; i <= 3; i++) {
    await input.fill(`hej${i}`);
    await input.press('Enter');
  }

  const itemsLeft = await page.locator('#todoCounter');
  expect(await itemsLeft.innerText()).toBe('3 items left');

  const checkbox = await page.locator('#todoList li:nth-child(2) input[type="checkbox"]');
  await checkbox.check();

  const itemsAfterComplete = await page.locator('#todoCounter');
  expect(await itemsAfterComplete.innerText()).toBe('2 items left');
});





