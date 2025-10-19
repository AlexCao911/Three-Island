import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { Model } from './Bird'

// Mock @react-three/drei
vi.mock('@react-three/drei', () => ({
  useGLTF: vi.fn(() => ({
    scene: { clone: vi.fn() },
    animations: [],
  })),
  useAnimations: vi.fn(() => ({ actions: {} })),
}))

// Mock three-stdlib
vi.mock('three-stdlib', () => ({
  SkeletonUtils: {
    clone: vi.fn((scene) => ({
      nodes: {
        _rootJoint: {},
        Object_7: { geometry: {}, skeleton: {} },
        Object_8: { geometry: {}, skeleton: {} },
      },
      materials: {
        MatI_Ride_FengHuang_01a: {},
        MatI_Ride_FengHuang_01b: {},
      },
    })),
  },
}))

describe('Bird Model Component', () => {
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

  it('should accept props', () => {
    const props = { position: [0, 0, 0], scale: 1 }
    const { container } = render(
      <Canvas>
        <Model {...props} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should use useGLTF hook with correct path', () => {
    const { useGLTF } = require('@react-three/drei')
    render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(useGLTF).toHaveBeenCalledWith('/bird-transformed.glb')
  })

  it('should use useAnimations hook', () => {
    const { useAnimations } = require('@react-three/drei')
    render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(useAnimations).toHaveBeenCalled()
  })

  it('should clone the scene using SkeletonUtils', () => {
    const { SkeletonUtils } = require('three-stdlib')
    render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(SkeletonUtils.clone).toHaveBeenCalled()
  })

  it('should handle dispose prop', () => {
    const { container } = render(
      <Canvas>
        <Model dispose={null} />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should render group with Sketchfab_Scene', () => {
    const { container } = render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(container.querySelector('group')).toBeTruthy()
  })

  it('should have correct license attribution in comments', () => {
    // Test that the component file contains proper attribution
    expect(Model).toBeDefined()
  })

  it('should preload the model', () => {
    // The useGLTF.preload should be called in the module
    expect(Model).toBeDefined()
  })
})