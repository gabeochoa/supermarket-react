import { expect, test } from 'vitest';
import { itemById } from './DataContext.tsx';
// Items is not exported; itemById contract tested with a duplicate-id-shaped list
test('itemById looks up by id field, not array index (duplicate-id bug)', () => {
  const items = [{ icon: 'a', id: 10, name: 'a', price: 1 }, { icon: 'b', id: 20, name: 'b', price: 1 }];
  expect(itemById(items, 20)?.name).toBe('b');
  expect(itemById(items, null)).toBeUndefined();
  expect(itemById(items, 99)).toBeUndefined();
});
test('source guard: ITEMS ids are unique and no ITEMS[...] index lookup remains', async () => {
  const fs = await import('node:fs');
  const ctx = fs.readFileSync(new URL('./DataContext.tsx', import.meta.url), 'utf8');
  const ids = [...ctx.matchAll(/\bid: (\d+),/g)].map((m) => m[1]);
  expect(new Set(ids).size).toBe(ids.length);
  for (const f of ['./App.tsx', './tabs.tsx', './LeftCol.tsx']) {
    expect(fs.readFileSync(new URL(f, import.meta.url), 'utf8')).not.toMatch(/ITEMS\[/);
  }
});
