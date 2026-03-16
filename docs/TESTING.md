# Qiibee Challenge
Qiibee Take-Home Coding Challenge

- [Back to main README](../README.md)

## Testing

#### Unit Tests
- All files are covered by unit tests, with 100% coverage.
- Run `npm t` to run all tests.
- Run `npm run test:unit` to run only unit tests.
- Run `npm run test:e2e` to run only e2e tests (very basic due to lack of time).
- Run `npm run cover:report` to get coverage report. A report will open in your browser.
- Used `Jest` and `Vitest` for unit tests.

#### Github Actions
- I setup a Github action workflow to run all tests on a feature branch as a precondition to merge to the devel branch.
- The workflow runs the tests again on the devel branch and auto merges to the main branch.
