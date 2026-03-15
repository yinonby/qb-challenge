# Qiibee Challenge
Qiibee Take-Home Coding Challenge

- [Back to main README](../README.md)

## Repository Structure
This is a monorepo, with shared code under `packages`, and application code in `app`.
- Used `husky` for consistent git hook scripts.
- Used `nyc` and `istanbul` for coverage report.
- Used Github Actions to ensure PRs and merges require status checks (under `.github`).

#### Shared Packages
- Reused utility libraries from another project (under `packages/qb-lib`):
  - Production:
    - `qb/utils` - provides generic utilities.
    - `qb/rnui` - provides React Native components styled using MUI guidelines (Material UI). Uses react-native-paper and other third-parties under the hood. Supports MD3 themes.
    - `qb/platform-ui` - provides client-platform-specific utilities, such as navigation, localization, storage etc. Under the hood uses Expo-specific libraries. Designed to easily extend project support for Next.js.
    - `@qb/client-utils` - provides client utils, such as logger, axios client etc.
  - Development and testing:
    - `qb/lint` - provides generic eslint config and dependencies.
    - `qb/vitest` - provides generic vitest config and dependencies.
    - `qb/ts-deps` - provides typescript dependencies. Simplifies typescript version upgrades.
    - `qb/rn-testing` - provides React Native testing utilities and dependencies.

#### Shared application packages (under `packages/qb-app`)
- `qb/models` - a library for shared models.
- `qb/dashboard-ui` - a library for shared UI compponents.

#### Application package (under `apps`)
- `@qb/dashboard-expo` - an minimal expo app, using shared UI components from `qb/dashboard-ui`.