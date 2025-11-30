# Copilot Coding Agent Instructions

## Repository Overview

This is `europeana`, an unofficial Node.js module for the Europeana API. It enables searching and looking up art in various European archives. The repository is a small, single-file Node.js package with minimal dependencies.

- **Type**: Node.js npm package
- **Main file**: `europeana.js` (single source file, ~155 lines)
- **Test file**: `test.js` (single test file using dotest framework)
- **License**: Unlicense (Public Domain)
- **Node.js version**: Requires Node.js 18 or higher (`engines.node: ">=18"`)

## Project Structure

```
/
├── europeana.js       # Main module source (exports Europeana class)
├── test.js            # Test suite using dotest framework
├── package.json       # Package manifest (no production dependencies)
├── eslint.config.js   # ESLint flat config (strict style rules)
├── .editorconfig      # Editor settings (2-space indent, UTF-8, LF endings)
├── .gitignore         # Ignores node_modules, coverage, logs, etc.
├── README.md          # Usage documentation and API reference
├── CHANGELOG.md       # Links to GitHub releases
├── SECURITY.md        # Security policy
├── LICENSE            # Unlicense (public domain)
└── .github/
    ├── workflows/
    │   ├── node.js.yml         # Main CI: lint + test on Node.js LTS versions
    │   └── codeql-analysis.yml # CodeQL security scanning
    ├── dependabot.yml          # Automated dependency updates
    └── FUNDING.yml             # Funding information
```

## Build and Development Commands

### Install Dependencies
```bash
npm install
```
**Always run this first** before testing or linting. There are no production dependencies, only devDependencies.

### Run Tests
```bash
npm test
```
This command runs:
1. ESLint (automatically via dotest)
2. Test suite with coverage reporting

**Important**: Tests require the `EUROPEANA_WSKEY` environment variable to be set with a valid API key for full coverage. Without it, API tests will fail with network errors. The CI workflow uses secrets for this.

### Run Linting Only
```bash
npx eslint europeana.js test.js
```
ESLint uses a flat config (`eslint.config.js`) with strict style rules including:
- 2-space indentation
- Single quotes
- Semicolons required
- Spaces inside parentheses: `( value )`
- Stroustrup brace style
- Trailing commas in multiline

### Code Style Rules
The ESLint config enforces specific formatting. Key patterns used in this codebase:
- Spaces inside parentheses: `function ( param )` not `function(param)`
- Spaces in object braces: `{ key: value }` not `{key: value}`
- Consistent trailing commas in multiline structures
- Unix line endings (LF)

## CI/CD Workflows

### Node.js Workflow (`.github/workflows/node.js.yml`)
Runs on: push to `master`/`develop`, PRs to `develop`, weekly schedule

Steps:
1. Fetches current Node.js LTS versions dynamically
2. For each version: `npm install` → `npm test`
3. Uploads coverage to Coveralls

### CodeQL Analysis (`.github/workflows/codeql-analysis.yml`)
Runs on: push to `master`/`develop`, PRs to `develop`, weekly schedule

Performs JavaScript security analysis using GitHub CodeQL.

## Making Changes

### Modifying the Main Module
Edit `europeana.js`. The module exports a single class `Europeana` with methods:
- `search(parameters)` - Search the Europeana database
- `getRecord({ id })` - Get a specific record
- `getRecordThumbnailUrl({ uri, type, size })` - Generate thumbnail URL

Private method `#talk()` handles all API communication.

### Adding Tests
Edit `test.js`. Tests use the `dotest` framework:
```javascript
dotest.add( 'Test name', async test => {
  // test logic
  test()
    .isObject( 'fail', 'label', value )
    .done();
});
```

### Validation Checklist
Before committing changes:
1. Run `npx eslint europeana.js test.js` - must pass with no errors
2. Run `npm test` - interface tests should pass (API tests may fail without network/API key)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `EUROPEANA_WSKEY` | API key for Europeana (required for API tests) |
| `EUROPEANA_TIMEOUT` | Request timeout in ms (optional, default: 15000) |
| `DOTEST_NOCOV` | Set to disable coverage (CI secret) |
| `DOTEST_MINCOV` | Minimum coverage threshold (CI secret) |

## Important Notes

1. **No build step required** - This is a pure JavaScript module with no compilation
2. **Tests require API access** - Full test coverage needs network access and valid API key
3. **ESLint runs automatically** - The `npm test` command runs ESLint before tests via dotest
4. **Coverage thresholds** - CI expects 85% coverage; local runs without API may fail this check
5. **package-lock.json is gitignored** - Do not commit it

## Trust These Instructions

These instructions have been validated against the repository. Only search for additional information if these instructions are incomplete or found to be incorrect.
