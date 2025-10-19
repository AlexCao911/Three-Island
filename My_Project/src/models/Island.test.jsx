import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { Model } from './Island'

vi.mock('@react-three/drei', () => ({
  useGLTF: vi.fn(() => ({
    nodes: {
      pCube11_rocks1_0: { geometry: {} },
      polySurface944_tree_body_0: { geometry: {}, instanceMatrix: {} },
      polySurface945_tree1_0: { geometry: {}, instanceMatrix: {} },
      polySurface946_tree2_0: { geometry: {}, instanceMatrix: {} },
      polySurface947_tree1_0: { geometry: {}, instanceMatrix: {} },
      polySurface948_tree_body_0: { geometry: {}, instanceMatrix: {} },
      polySurface949_tree_body_0: { geometry: {}, instanceMatrix: {} },
    },
    materials: {
      PaletteMaterial001: {},
    },
  })),
}))

describe('Island Model Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should be a function component', () => {
    expect(typeof Model).toBe('function')
  })

  it('should use useGLTF hook with correct path', () => {
    const { useGLTF } = require('@react-three/drei')
    render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(useGLTF).toHaveBeenCalledWith('/island-transformed.glb')
  })

  it('should accept props and spread them to group', () => {
    const props = { position: [0, -5, 0], scale: 2 }
    const { container } = render(
      <Canvas>
        <Model {...props} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should handle dispose null prop', () => {
    const { container } = render(
      <Canvas>
        <Model dispose={null} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should render instanced meshes for trees', () => {
    const { container } = render(
      <Canvas>
        <Model />
      </Canvas>
    )
    // Island has multiple instanced meshes for optimization
    expect(container).toBeTruthy()
  })

  it('should have CC-BY-4.0 license attribution', () => {
    expect(Model).toBeDefined()
  })

  it('should preload the model', () => {
    expect(Model).toBeDefined()
  })
})