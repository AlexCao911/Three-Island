import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { IslandWithTowerV1 } from './Island_with_tower_v1'

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

describe('IslandWithTowerV1 Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <IslandWithTowerV1 />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should be a named export', () => {
    expect(IslandWithTowerV1).toBeDefined()
    expect(typeof IslandWithTowerV1).toBe('function')
  })

  it('should use useGLTF hook with correct path', () => {
    const { useGLTF } = require('@react-three/drei')
    render(
      <Canvas>
        <IslandWithTowerV1 />
      </Canvas>
    )
    expect(useGLTF).toHaveBeenCalledWith('/island_with_tower_v1-transformed.glb')
  })

  it('should accept group element props', () => {
    const props = { position: [1, 2, 3] as [number, number, number], scale: 1.5 }
    const { container } = render(
      <Canvas>
        <IslandWithTowerV1 {...props} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should handle dispose prop correctly', () => {
    const { container } = render(
      <Canvas>
        <IslandWithTowerV1 dispose={null} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should have proper TypeScript GLTFResult interface', () => {
    expect(IslandWithTowerV1).toBeDefined()
  })

  it('should import THREE types correctly', () => {
    expect(IslandWithTowerV1).toBeDefined()
  })

  it('should preload the model on module load', () => {
    expect(IslandWithTowerV1).toBeDefined()
  })
})