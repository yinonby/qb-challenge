# Qiibee Challenge
Qiibee Take-Home Coding Challenge

## Environment Setup
- Run 'npm t' to test the repository.
- Run 'npm run cover:report' to create a coverage report and open it in the local browser.

## Environment Infrastructure
- Use `husky` for consistent git hook scripts.
- Use `nyc` and `istanbul` for coverage report.
- Use Github Actions to ensure PRs and merges require status checks.
- Reuse utility libraries from another project:
  - Production:
    - `qb/utils` - provides generic utilities.
    - `qb/rnui` - provides React Native components styled using MUI guidelines (Material UI). Uses react-native-paper and other third-parties under the hood. Supports MD3 themes.
  - Development and testing:
    - `qb/lint` - provides generic eslint config and dependencies.
    - `qb/vitest` - provides generic vitest config and dependencies.
    - `qb/ts-deps` - provides typescript dependencies. Simplifies typescript version upgrades.
    - `qb/rn-testing` - provides React Native testing utilities and dependencies.
    

