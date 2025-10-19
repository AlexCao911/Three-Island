import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock WebGL context for Three.js tests
class MockWebGLRenderingContext {
  canvas = document.createElement('canvas')
  getExtension = vi.fn()
  getParameter = vi.fn()
  createShader = vi.fn()
  shaderSource = vi.fn()
  compileShader = vi.fn()
  getShaderParameter = vi.fn(() => true)
  createProgram = vi.fn()
  attachShader = vi.fn()
  linkProgram = vi.fn()
  getProgramParameter = vi.fn(() => true)
  useProgram = vi.fn()
  createBuffer = vi.fn()
  bindBuffer = vi.fn()
  bufferData = vi.fn()
  enableVertexAttribArray = vi.fn()
  vertexAttribPointer = vi.fn()
  getAttribLocation = vi.fn(() => 0)
  getUniformLocation = vi.fn(() => ({}))
  uniform1f = vi.fn()
  uniform2f = vi.fn()
  uniform3f = vi.fn()
  uniform4f = vi.fn()
  uniformMatrix4fv = vi.fn()
  clear = vi.fn()
  clearColor = vi.fn()
  enable = vi.fn()
  disable = vi.fn()
  blendFunc = vi.fn()
  viewport = vi.fn()
  drawArrays = vi.fn()
  drawElements = vi.fn()
  deleteShader = vi.fn()
  deleteProgram = vi.fn()
  deleteBuffer = vi.fn()
  getContextAttributes = vi.fn(() => ({ alpha: true }))
}

// Mock HTMLCanvasElement.getContext
HTMLCanvasElement.prototype.getContext = function (contextType: string) {
  if (contextType === 'webgl' || contextType === 'webgl2' || contextType === 'experimental-webgl') {
    return new MockWebGLRenderingContext() as any
  }
  return null
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})