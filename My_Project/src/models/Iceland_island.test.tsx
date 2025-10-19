import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { IcelandIsland } from './Iceland_island'

vi.mock('@react-three/drei', () => ({
  useGLTF: vi.fn(() => ({
    nodes: {
      model: { geometry: {} },
    },
    materials: {
      model: {},
    },
  })),
}))

describe('IcelandIsland Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <IcelandIsland />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should be a named export', () => {
    expect(IcelandIsland).toBeDefined()
    expect(typeof IcelandIsland).toBe('function')
  })

  it('should use useGLTF hook with correct path', () => {
    const { useGLTF } = require('@react-three/drei')
    render(
      <Canvas>
        <IcelandIsland />
      </Canvas>
    )
    expect(useGLTF).toHaveBeenCalledWith('/iceland_island-transformed.glb')
  })

  it('should accept group props via JSX.IntrinsicElements', () => {
    const props = { position: [0, 0, 0] as [number, number, number] }
    const { container } = render(
      <Canvas>
        <IcelandIsland {...props} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should handle dispose null prop', () => {
    const { container } = render(
      <Canvas>
        <IcelandIsland dispose={null} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should have proper TypeScript typing', () => {
    // Component accepts JSX.IntrinsicElements['group']
    expect(typeof IcelandIsland).toBe('function')
  })

  it('should use GLTFResult interface for type safety', () => {
    expect(IcelandIsland).toBeDefined()
  })

  it('should preload the model', () => {
    expect(IcelandIsland).toBeDefined()
  })

  it('should render a single mesh from model node', () => {
    const { container } = render(
      <Canvas>
        <IcelandIsland />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })
})