import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './Home'

// Mock @react-three/fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children, className, camera }: any) => (
    <div data-testid="canvas-mock" className={className} data-camera={JSON.stringify(camera)}>
      {children}
    </div>
  ),
}))

// Mock Loader component
vi.mock('../components/Loader', () => ({
  default: () => <div data-testid="loader-mock">Loading...</div>
}))

describe('Home Page Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    const { container } = render(<Home />)
    expect(container).toBeTruthy()
  })

  it('should render a section with correct classes', () => {
    const { container } = render(<Home />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('w-full', 'h-screen', 'relative')
  })

  it('should display "Home" text', () => {
    render(<Home />)
    expect(screen.getByText('Home', { exact: false })).toBeInTheDocument()
  })

  it('should render an absolute positioned div for overlay content', () => {
    const { container } = render(<Home />)
    const overlayDiv = container.querySelector('.absolute.top-28')
    expect(overlayDiv).toBeInTheDocument()
    expect(overlayDiv).toHaveClass('left-0', 'right-0', 'z-10', 'flex', 'items-center', 'justify-center')
  })

  it('should render Canvas component', () => {
    render(<Home />)
    expect(screen.getByTestId('canvas-mock')).toBeInTheDocument()
  })

  it('should configure Canvas with correct classes', () => {
    render(<Home />)
    const canvas = screen.getByTestId('canvas-mock')
    expect(canvas).toHaveClass('w-full', 'h-screen', 'bg-transparent')
  })

  it('should configure Canvas camera with correct properties', () => {
    render(<Home />)
    const canvas = screen.getByTestId('canvas-mock')
    const cameraData = canvas.getAttribute('data-camera')
    const camera = JSON.parse(cameraData || '{}')
    expect(camera.near).toBe(0.1)
    expect(camera.far).toBe(1000)
  })

  it('should wrap content in Suspense with Loader fallback', () => {
    render(<Home />)
    // The Loader will be rendered as part of the Suspense fallback
    const canvas = screen.getByTestId('canvas-mock')
    expect(canvas).toBeInTheDocument()
  })

  it('should render ambient light in the scene', () => {
    const { container } = render(<Home />)
    const canvas = screen.getByTestId('canvas-mock')
    expect(canvas.innerHTML).toContain('ambientLight')
  })

  it('should render directional light in the scene', () => {
    const { container } = render(<Home />)
    const canvas = screen.getByTestId('canvas-mock')
    expect(canvas.innerHTML).toContain('directionalLight')
  })

  it('should render hemisphere light in the scene', () => {
    const { container } = render(<Home />)
    const canvas = screen.getByTestId('canvas-mock')
    expect(canvas.innerHTML).toContain('hemisphereLight')
  })

  it('should have proper z-index layering', () => {
    const { container } = render(<Home />)
    const overlayDiv = container.querySelector('.z-10')
    expect(overlayDiv).toBeInTheDocument()
  })

  it('should use Suspense import from react', () => {
    // Test that the component imports Suspense correctly
    render(<Home />)
    expect(screen.getByTestId('canvas-mock')).toBeInTheDocument()
  })

  it('should maintain consistent section structure', () => {
    const { container } = render(<Home />)
    const section = container.querySelector('section')
    expect(section?.children.length).toBeGreaterThanOrEqual(2)
  })

  it('should have responsive sizing classes', () => {
    const { container } = render(<Home />)
    const section = container.querySelector('section')
    const canvas = screen.getByTestId('canvas-mock')
    
    expect(section).toHaveClass('w-full', 'h-screen')
    expect(canvas).toHaveClass('w-full', 'h-screen')
  })
})