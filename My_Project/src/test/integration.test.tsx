import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// Mock all dependencies
vi.mock('../components/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>
}))

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
}))

vi.mock('../pages/Home', () => ({
  default: () => <div data-testid="home">Home Page</div>
}))

vi.mock('../pages/About', () => ({
  default: () => <div data-testid="about">About Page</div>
}))

vi.mock('../pages/Projects', () => ({
  default: () => <div data-testid="projects">Projects Page</div>
}))

vi.mock('../pages/Contact', () => ({
  default: () => <div data-testid="contact">Contact Page</div>
}))

vi.mock('../components/Navbar.tsx', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>
}))

describe('Integration Tests', () => {
  describe('App Routing Integration', () => {
    it('should navigate between all pages', () => {
      const routes = ['/', '/about', '/projects', '/contact']
      
      routes.forEach(route => {
        const { container } = render(
          <MemoryRouter initialEntries={[route]}>
            <App />
          </MemoryRouter>
        )
        expect(container.querySelector('main')).toBeInTheDocument()
        expect(screen.getByTestId('navbar')).toBeInTheDocument()
      })
    })

    it('should maintain navbar across all routes', () => {
      const routes = ['/', '/about', '/projects', '/contact']
      
      routes.forEach(route => {
        render(
          <MemoryRouter initialEntries={[route]}>
            <App />
          </MemoryRouter>
        )
        expect(screen.getByTestId('navbar')).toBeInTheDocument()
      })
    })

    it('should render correct page component for each route', () => {
      const testCases = [
        { path: '/', testId: 'home' },
        { path: '/about', testId: 'about' },
        { path: '/projects', testId: 'projects' },
        { path: '/contact', testId: 'contact' },
      ]

      testCases.forEach(({ path, testId }) => {
        render(
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        )
        expect(screen.getByTestId(testId)).toBeInTheDocument()
      })
    })
  })

  describe('Component Composition', () => {
    it('should compose App with Router and Navbar', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
    })

    it('should have proper styling hierarchy', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      expect(main).toHaveClass('bg-slate-300/20')
    })
  })

  describe('Icon Module Integration', () => {
    it('should successfully import icon barrel file', async () => {
      const icons = await import('../assets/icons/index.js')
      expect(icons).toBeDefined()
      expect(Object.keys(icons).length).toBeGreaterThan(0)
    })

    it('should export tech stack icons', async () => {
      const { react, typescript, nodejs } = await import('../assets/icons/index.js')
      expect(react).toBeDefined()
      expect(typescript).toBeDefined()
      expect(nodejs).toBeDefined()
    })
  })

  describe('Model Preloading', () => {
    it('should allow model components to be imported', async () => {
      const modules = [
        '../models/Bird',
        '../models/Fox',
        '../models/Island',
        '../models/Sky',
      ]

      for (const modulePath of modules) {
        const module = await import(modulePath)
        expect(module.Model).toBeDefined()
      }
    })
  })
})