# CORRECT — supermarket-react
Upstream template commits (deps/eslint history) excluded; classes are from the game commits `37c3493..bec818e`. Install used `npm install --no-package-lock` (pnpm absent on this Mac); `node_modules` removed after.

| # | Class (evidence ×2+) | Level & why | Commit | Proof |
|---|---|---|---|---|
| 1 | Order invariants remembered, not enforced: `bec818e` amount could be 0, `1026b1a` price displayed/set as amount, TODO ratio<1 unsupported | Architecture: only `makeOrder/topUpOrders` in `src/orders.ts` can create orders; `assertValidOrder` throws | f5f2791 | `orders.test.ts`: rng=0 → amount 1 (old code 0); price=amount×ratio; invalid orders throw |
| 2 | Identity/index + state mutation: `Items` both `id:0` while `ITEMS[item_id]` at App/tabs/LeftCol (3 sites); `addItem`+`removeAmount` both mutated the state array in place | Types/architecture: unique ids, `itemById()` by field, pure new-array updates (same-reference mutation defeats React rendering) | 51d45a0 | `DataContext.test.ts`: by-id lookup, duplicate-id + `ITEMS[` source guards (fail on old tree) |
| 3 | `strict:true` defeated by `any`: `DataManager data:any`×3, `_props:any`×2, `cmp:any`×2, `defaultValue` holding `Array` constructors — `tsc` failed pre-fix (~20 errors) | Types: exported `DataContextType` is the context; no explicit `any` left for eslint `no-explicit-any` to catch | 8a1ba22 | `npx tsc --noEmit` OK, `npx eslint src/` clean, `npx vitest run` 6 PASS |

## Rule table
| Rule | Enforcement |
|---|---|
| Orders only from `makeOrder`; amount≥1, price=amount×ratio≥amount, pct∈(0,100] | `src/orders.ts` + tests |
| Look items up with `itemById(ITEMS,id)`; ids unique; never `ITEMS[id]`, never mutate state arrays | `itemById`, pure helpers + source-guard test |
| No `any` in `src/`; context consumers use `DataContextType` | tsc strict + eslint (in `pnpm test`) |
