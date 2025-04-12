# LocalSource Testing Strategy

This document outlines the testing approach for the LocalSource application. Our goal is to ensure the application works as expected across various devices and browsers.

## Testing Tools

- **Unit Testing**: Vitest with React Testing Library
- **End-to-End Testing**: Playwright
- **Code Coverage**: Vitest's built-in coverage
- **CI/CD**: GitHub Actions

## Test Types

### Unit Tests

Unit tests focus on testing individual components in isolation. They validate that components render correctly and handle user interactions as expected.

- Located in `src/components/__tests__/` 
- Run with `npm test` or `npm run test:coverage`
- Coverage reports are generated in the `coverage` directory

### End-to-End Tests

E2E tests validate the application's functionality from the user's perspective. They simulate user interactions and verify that all parts of the application work together correctly.

- Located in `e2e/` directory
- Run with `npm run test:e2e`
- Playwright reports are generated in the `playwright-report` directory

## Testing Guidelines

### Writing Unit Tests

1. **Test Component Rendering**: Verify that components render correctly with the given props
2. **Test User Interactions**: Simulate user interactions and verify the expected behavior
3. **Test Edge Cases**: Ensure components handle edge cases gracefully

Example:
```tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders with default props', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Writing E2E Tests

1. **Test User Flows**: Focus on complete user flows rather than isolated features
2. **Test Multiple Browsers/Devices**: Verify functionality across different browsers and device sizes
3. **Test Performance**: Include tests for performance metrics like loading times

Example:
```ts
import { test, expect } from '@playwright/test';

test('user can search for vendors', async ({ page }) => {
  await page.goto('/search');
  await page.getByPlaceholder('Search vendors...').fill('farm');
  await expect(page.locator('.search-results')).toBeVisible();
});
```

## Continuous Integration

Our CI pipeline runs all tests on each push and pull request to the main branch:

1. **Unit Tests**: Runs all unit tests and generates coverage reports
2. **E2E Tests**: Runs all Playwright tests across multiple browsers
3. **Build**: Verifies that the application builds correctly

## Code Coverage Targets

- **Overall Coverage**: 80%
- **Component Coverage**: 85%
- **Service Coverage**: 90%

Coverage reports are generated on each CI run and can be viewed in the GitHub Actions artifacts.

## Manual Testing

Despite automated testing, manual testing is still important for:

- Visual consistency
- User experience
- Performance on real devices
- Accessibility

The QA team should perform manual tests before each release. 