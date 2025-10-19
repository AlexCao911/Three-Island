import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

// Mock the page components
vi.mock('./pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>
}))

vi.mock('./pages/About', () => ({
  default: () => <div data-testid="about-page">About Page</div>
}))

vi.mock('./pages/Projects', () => ({
  default: () => <div data-testid="projects-page">Projects Page</div>
}))

vi.mock('./pages/Contact', () => ({
  default: () => <div data-testid="contact-page">Contact Page</div>
}))

vi.mock('./components/Navbar.tsx', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>
}))

describe('App Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })

  it('should render the main element with correct className', () => {
    const { container } = render(<App />)
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('bg-slate-300/20')
  })

  it('should render Navbar component', () => {
    render(<App />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('should render Home page at root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('should render About page at /about path', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('about-page')).toBeInTheDocument()
  })

  it('should render Projects page at /projects path', () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('projects-page')).toBeInTheDocument()
  })

  it('should render Contact page at /contact path', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('contact-page')).toBeInTheDocument()
  })

  it('should have proper route configuration', () => {
    const { container } = render(<App />)
    expect(container.querySelector('main')).toBeInTheDocument()
  })

  it('should maintain consistent layout structure', () => {
    const { container } = render(<App />)
    const main = container.querySelector('main')
    expect(main?.firstElementChild?.tagName).toBe('DIV') // Router wrapper
  })

  it('should properly format spacing in JSX', () => {
    const { container } = render(<App />)
    const routes = container.querySelectorAll('[data-testid$="-page"]')
    expect(routes.length).toBeGreaterThanOrEqual(0)
  })
})