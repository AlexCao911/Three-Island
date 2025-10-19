# Test Suite Documentation

## Overview
This test suite provides comprehensive coverage for the 3D portfolio project, including:
- Component unit tests
- 3D model component tests
- Asset validation tests
- Integration tests
- Routing tests

## Test Framework
- **Vitest**: Fast unit test framework for Vite projects
- **React Testing Library**: Testing utilities for React components
- **jsdom**: DOM implementation for Node.js

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run tests once (CI mode)
```bash
npm run test:run
```

## Test Structure

### Component Tests
- `src/App.test.tsx` - Main App component and routing
- `src/components/Loader.test.tsx` - 3D loading indicator
- `src/pages/Home.test.tsx` - Home page with Canvas

### 3D Model Tests
- `src/models/Bird.test.jsx` - Phoenix bird model
- `src/models/Fox.test.jsx` - Animated fox model
- `src/models/Island.test.jsx` - Island model with instancing
- `src/models/Sky.test.jsx` - Skybox sphere model
- `src/models/Plane.test.jsx` - WW1 plane model
- `src/models/Iceland_island.test.tsx` - Iceland island (TypeScript)
- `src/models/Island_with_tower_v1.test.tsx` - Island variant 1
- `src/models/Island_with_tower_v2.test.tsx` - Island variant 2

### Asset Tests
- `src/assets/icons/index.test.js` - Icon barrel exports
- `src/test/assets/assetValidation.test.ts` - Asset integrity checks

### Integration Tests
- `src/test/integration.test.tsx` - Full app integration tests

## Test Coverage

The test suite covers:
- ✅ Component rendering
- ✅ Props handling
- ✅ React hooks (useGLTF, useAnimations)
- ✅ Routing navigation
- ✅ Asset exports
- ✅ 3D model loading
- ✅ Error boundaries
- ✅ Edge cases

## Mocking Strategy

### WebGL/Three.js
All WebGL contexts and Three.js operations are mocked in `src/test/setup.ts` to enable testing without GPU.

### 3D Models
GLTF models are mocked to return appropriate node/material structures without loading actual binary files.

### React Three Fiber
Canvas and hooks from @react-three/fiber are mocked to test component logic without rendering 3D scenes.

## Best Practices

1. **Isolation**: Each test is independent and can run in any order
2. **Mocking**: External dependencies are properly mocked
3. **Coverage**: Tests cover happy paths, edge cases, and error conditions
4. **Naming**: Descriptive test names following "should..." convention
5. **Cleanup**: Automatic cleanup after each test

## CI/CD Integration

Tests are designed to run in CI environments:
- No GPU required (WebGL mocked)
- No binary asset loading required
- Fast execution (<5 seconds for full suite)
- Deterministic results

## Extending Tests

When adding new components:
1. Create a `.test.tsx` or `.test.jsx` file alongside the component
2. Import and mock external dependencies
3. Test rendering, props, and key functionality
4. Add integration tests if component affects routing or global state

## Troubleshooting

### Tests fail with WebGL errors
- Ensure `src/test/setup.ts` is properly configured in `vitest.config.ts`
- Check that Canvas is mocked in component tests

### Import errors
- Verify all dependencies are installed: `npm install`
- Check that file extensions match in import statements

### Type errors
- Run `tsc --noEmit` to check TypeScript types
- Ensure `@types` packages are installed