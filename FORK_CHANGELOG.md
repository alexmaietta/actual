# Fork Changelog

Tracks changes in this fork (`alexmaietta/actual`) that diverge from
[actualbudget/actual](https://github.com/actualbudget/actual). Not for
upstream consumption — see `upcoming-release-notes/` for that.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
All work lives on the `amaietta/dev` branch; `master` stays a clean mirror
of upstream.

## [Unreleased]

### Added

- **Holdings account type** — new `Holdings` account type with its own view
  (`packages/desktop-client/src/components/accounts/Holdings.tsx`) and
  schema support (`holding.ts`, `1784669792548_add_holdings.sql`).
- **Transaction memo field** — separate `memo` field on transactions, shown
  alongside Notes and auto-filled from SimpleFin imports
  (`1784161542743_add_transaction_memo.sql`, `app-simplefin.js`).
- **Custom sync mapping updates** — extended bank-sync mapping support
  (`custom-sync-mapping.ts`, `sync.ts`, `bank-sync.ts`, `EditSyncAccount.tsx`).

[Unreleased]: https://github.com/alexmaietta/actual/compare/master...amaietta/dev
