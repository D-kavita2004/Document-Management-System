// src/test/setup.ts
import '@testing-library/jest-dom'
// src/setupTests.ts
class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
global.ResizeObserver = ResizeObserver;
    