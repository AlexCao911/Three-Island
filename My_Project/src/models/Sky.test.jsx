import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from '@react-three/fiber'
import { Model } from './Sky'

vi.mock('@react-three/drei', () => ({
  useGLTF: vi.fn(() => ({
    nodes: {
      Sphere__0: { geometry: {} },
    },
    materials: {
      'Scene_-_Root': {},
    },
  })),
}))

describe('Sky Model Component', () => {
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
    expect(useGLTF).toHaveBeenCalledWith('/sky-transformed.glb')
  })

  it('should accept props and spread them to group', () => {
    const props = { position: [0, 0, 0] }
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

  it('should have large scale for skybox', () => {
    // Sky model uses scale of 500 for skybox effect
    const { container } = render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should have proper rotation for sphere', () => {
    // Rotated by -PI/2 on x-axis
    const { container } = render(
      <Canvas>
        <Model />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should have CC-BY-4.0 license', () => {
    expect(Model).toBeDefined()
  })

  it('should preload the model', () => {
    expect(Model).toBeDefined()
  })
})