// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


/**
 * This section forces jest to treat React as a singleton even when using jest.resetModules.
 * There should never be more than one React instance or hooks will crash between test cases.
 */
const RESET_MODULE_EXCEPTIONS = [
  'react',
];

let mockActualRegistry = {};

RESET_MODULE_EXCEPTIONS.forEach(moduleName => {
  jest.doMock(moduleName, () => {
    if (!mockActualRegistry[moduleName]) {
      mockActualRegistry[moduleName] = jest.requireActual(moduleName);
    }
    return mockActualRegistry[moduleName];
  });
});
