// Test setup - runs before all tests
import { vi, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = {
  store: {},
  getItem: vi.fn((key) => localStorageMock.store[key] || null),
  setItem: vi.fn((key, value) => { localStorageMock.store[key] = String(value); }),
  removeItem: vi.fn((key) => { delete localStorageMock.store[key]; }),
  clear: vi.fn(() => { localStorageMock.store = {}; }),
};

// Only set localStorage if not already available (happy-dom provides it)
if (typeof global.localStorage === 'undefined') {
  global.localStorage = localStorageMock;
} else {
  // Spy on existing localStorage methods
  vi.spyOn(global.localStorage, 'getItem').mockImplementation((key) => localStorageMock.store[key] || null);
  vi.spyOn(global.localStorage, 'setItem').mockImplementation((key, value) => { localStorageMock.store[key] = String(value); });
  vi.spyOn(global.localStorage, 'removeItem').mockImplementation((key) => { delete localStorageMock.store[key]; });
  vi.spyOn(global.localStorage, 'clear').mockImplementation(() => { localStorageMock.store = {}; });
}

// Mock fetch
global.fetch = vi.fn();

// Note: crypto.getRandomValues is provided by happy-dom, no need to mock

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.store = {};
});
