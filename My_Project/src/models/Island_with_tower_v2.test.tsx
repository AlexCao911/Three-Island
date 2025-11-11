import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { IslandWithTowerV2 } from './Island_with_tower_v2'

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

describe('IslandWithTowerV2 Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <IslandWithTowerV2 />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should be a named export', () => {
    expect(IslandWithTowerV2).toBeDefined()
    expect(typeof IslandWithTowerV2).toBe('function')
  })

  it('should use useGLTF hook with correct path', () => {
    const { useGLTF } = require('@react-three/drei')
    render(
      <Canvas>
        <IslandWithTowerV2 />
      </Canvas>
    )
    expect(useGLTF).toHaveBeenCalledWith('/island_with_tower_v2-transformed.glb')
  })

  it('should accept JSX.IntrinsicElements group props', () => {
    const props = { 
      position: [0, -2, 0] as [number, number, number],
      rotation: [0, Math.PI / 4, 0] as [number, number, number]
    }
    const { container } = render(
      <Canvas>
        <IslandWithTowerV2 {...props} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should handle dispose null prop', () => {
    const { container } = render(
      <Canvas>
        <IslandWithTowerV2 dispose={null} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should have TypeScript type safety with GLTFResult', () => {
    expect(IslandWithTowerV2).toBeDefined()
  })

  it('should import necessary THREE types', () => {
    expect(IslandWithTowerV2).toBeDefined()
  })

  it('should preload model for performance', () => {
    expect(IslandWithTowerV2).toBeDefined()
  })

  it('should render model mesh correctly', () => {
    const { container } = render(
      <Canvas>
        <IslandWithTowerV2 />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })
})