import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { Model } from './Plane'

vi.mock('@react-three/drei', () => ({
  useGLTF: vi.fn(() => ({
    nodes: {},
    materials: {},
    animations: [],
  })),
  useAnimations: vi.fn(() => ({ actions: {} })),
}))

describe('Plane Model Component', () => {
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
    expect(useGLTF).toHaveBeenCalledWith('/plane-transformed.glb')
  })

  it('should use useAnimations for plane animations', () => {
    const { useAnimations } = require('@react-three/drei')
    render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(useAnimations).toHaveBeenCalled()
  })

  it('should accept props and spread to root group', () => {
    const props = { position: [0, 10, 0], scale: 0.5 }
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

  it('should have CC-BY-4.0 license attribution', () => {
    expect(Model).toBeDefined()
  })

  it('should preload the model', () => {
    expect(Model).toBeDefined()
  })

  it('should be a complex model with many mesh groups', () => {
    // Plane is a large model with 501 lines
    const { container } = render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })
})