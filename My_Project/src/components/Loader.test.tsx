import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loader from './Loader'
import { Canvas } from '@react-three/fiber'

// Mock @react-three/drei
vi.mock('@react-three/drei', () => ({
  Html: ({ children }: { children: React.ReactNode }) => <div data-testid="html-mock">{children}</div>,
}))

describe('Loader Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Loader />)
    expect(container).toBeTruthy()
  })

  it('should render Html component from drei', () => {
    render(<Loader />)
    expect(screen.getByTestId('html-mock')).toBeInTheDocument()
  })

  it('should render a flex container with proper classes', () => {
    render(<Loader />)
    const flexContainer = screen.getByTestId('html-mock').querySelector('div')
    expect(flexContainer).toHaveClass('flex', 'justify-center', 'items-center')
  })

  it('should render a spinning loader element', () => {
    render(<Loader />)
    const spinner = screen.getByTestId('html-mock').querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('should have correct spinner styling classes', () => {
    render(<Loader />)
    const spinner = screen.getByTestId('html-mock').querySelector('.animate-spin')
    expect(spinner).toHaveClass(
      'w-20',
      'h-20',
      'border-2',
      'border-opacity-20',
      'border-blue-500',
      'border-t-blue-500',
      'rounded-full',
      'animate-spin'
    )
  })

  it('should be usable within Canvas component', () => {
    const { container } = render(
      <Canvas>
        <Loader />
      </Canvas>
    )
    expect(container).toBeTruthy()
  })

  it('should export Loader as default', () => {
    expect(Loader).toBeDefined()
    expect(typeof Loader).toBe('function')
  })

  it('should render consistent HTML structure', () => {
    const { container } = render(<Loader />)
    const htmlMock = container.querySelector('[data-testid="html-mock"]')
    expect(htmlMock?.children.length).toBe(1)
  })
})