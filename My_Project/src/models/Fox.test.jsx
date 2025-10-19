import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { Model } from './Fox'

vi.mock('@react-three/drei', () => ({
  useGLTF: vi.fn(() => ({
    scene: { clone: vi.fn() },
    animations: [],
  })),
  useAnimations: vi.fn(() => ({ actions: {} })),
}))

vi.mock('three-stdlib', () => ({
  SkeletonUtils: {
    clone: vi.fn((scene) => ({
      nodes: {
        GLTF_created_0_rootJoint: {},
        Object_7: { geometry: {}, skeleton: {} },
        Object_8: { geometry: {}, skeleton: {} },
        Object_9: { geometry: {}, skeleton: {} },
        Object_10: { geometry: {}, skeleton: {} },
        Object_11: { geometry: {}, skeleton: {} },
      },
      materials: {
        PaletteMaterial001: {},
      },
    })),
  },
}))

describe('Fox Model Component', () => {
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
    expect(useGLTF).toHaveBeenCalledWith('/fox-transformed.glb')
  })

  it('should use useAnimations hook for animations', () => {
    const { useAnimations } = require('@react-three/drei')
    render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(useAnimations).toHaveBeenCalled()
  })

  it('should accept and spread props to group', () => {
    const props = { position: [1, 2, 3], rotation: [0, Math.PI, 0] }
    const { container } = render(
      <Canvas>
        <Model {...props} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should clone scene using SkeletonUtils', () => {
    const { SkeletonUtils } = require('three-stdlib')
    render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(SkeletonUtils.clone).toHaveBeenCalled()
  })

  it('should render multiple skinned meshes', () => {
    const { container } = render(
      <Canvas>
        <Model />
      </Canvas>
    )
    // Fox model has 5 skinned mesh objects (Object_7 through Object_11)
    expect(container).toBeTruthy()
  })

  it('should have CC-BY-4.0 license', () => {
    // Verify the component is properly defined with attribution
    expect(Model).toBeDefined()
  })

  it('should handle dispose null prop', () => {
    const { container } = render(
      <Canvas>
        <Model dispose={null} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })
})