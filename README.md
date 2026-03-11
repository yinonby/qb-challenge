# Qiibee Challenge
Qiibee Take-Home Coding Challenge

## Environment Setup
- Run repository tests:
```bash
npm t
```
- Produce a coverage report and open it in the local browser:
```bash
npm run cover:report
```

## Environment Infrastructure
- Use `husky` for consistent git hook scripts.
- Use `nyc` and `istanbul` for coverage report.
- Use Github Actions to ensure PRs and merges require status checks (under `.github`).
- Reuse utility libraries from another project (under `packages/qb-lib`):
  - Production:
    - `qb/utils` - provides generic utilities.
    - `qb/rnui` - provides React Native components styled using MUI guidelines (Material UI). Uses react-native-paper and other third-parties under the hood. Supports MD3 themes.
    - `qb/platform-ui` - provides client-platform-specific utilities, such as navigation, localization, storage etc. Under the hood uses Expo-specific libraries. Designed to easily extend project support for Next.js.
  - Development and testing:
    - `qb/lint` - provides generic eslint config and dependencies.
    - `qb/vitest` - provides generic vitest config and dependencies.
    - `qb/ts-deps` - provides typescript dependencies. Simplifies typescript version upgrades.
    - `qb/rn-testing` - provides React Native testing utilities and dependencies.

