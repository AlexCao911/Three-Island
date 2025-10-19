import { describe, it, expect } from 'vitest'
import * as icons from './index.js'

describe('Icons Index', () => {
  const expectedIcons = [
    'css',
    'express',
    'git',
    'github',
    'html',
    'javascript',
    'mongodb',
    'motion',
    'mui',
    'nextjs',
    'nodejs',
    'react',
    'redux',
    'sass',
    'tailwindcss',
    'typescript',
    'linkedin',
    'twitter',
    'car',
    'estate',
    'pricewise',
    'snapgram',
    'summiz',
    'threads',
    'arrow',
    'contact',
    'soundon',
    'soundoff'
  ]

  it('should export all expected icons', () => {
    expectedIcons.forEach(iconName => {
      expect(icons[iconName]).toBeDefined()
      expect(icons[iconName]).not.toBeNull()
    })
  })

  it('should export exactly 28 icons', () => {
    const exportedKeys = Object.keys(icons)
    expect(exportedKeys.length).toBe(28)
  })

  it('should export SVG files as strings', () => {
    const svgIcons = [
      'css', 'express', 'git', 'github', 'html', 'javascript',
      'mongodb', 'motion', 'mui', 'nextjs', 'nodejs', 'react',
      'redux', 'sass', 'tailwindcss', 'typescript', 'linkedin',
      'twitter', 'car', 'estate', 'pricewise', 'snapgram',
      'summiz', 'threads', 'arrow', 'contact'
    ]
    
    svgIcons.forEach(iconName => {
      expect(typeof icons[iconName]).toBe('string')
    })
  })

  it('should export PNG files as strings', () => {
    expect(typeof icons.soundon).toBe('string')
    expect(typeof icons.soundoff).toBe('string')
  })

  it('should have valid icon paths', () => {
    expectedIcons.forEach(iconName => {
      const iconPath = icons[iconName]
      expect(iconPath).toBeTruthy()
      expect(iconPath.length).toBeGreaterThan(0)
    })
  })

  it('should export tech stack icons', () => {
    const techIcons = ['css', 'html', 'javascript', 'typescript', 'react', 'nodejs', 'express', 'mongodb']
    techIcons.forEach(tech => {
      expect(icons[tech]).toBeDefined()
    })
  })

  it('should export social media icons', () => {
    const socialIcons = ['linkedin', 'twitter', 'github', 'threads']
    socialIcons.forEach(social => {
      expect(icons[social]).toBeDefined()
    })
  })

  it('should export project icons', () => {
    const projectIcons = ['car', 'estate', 'pricewise', 'snapgram', 'summiz']
    projectIcons.forEach(project => {
      expect(icons[project]).toBeDefined()
    })
  })

  it('should export utility icons', () => {
    const utilityIcons = ['arrow', 'contact', 'soundon', 'soundoff']
    utilityIcons.forEach(utility => {
      expect(icons[utility]).toBeDefined()
    })
  })

  it('should not have undefined exports', () => {
    Object.values(icons).forEach(icon => {
      expect(icon).not.toBeUndefined()
    })
  })

  it('should allow destructured imports', () => {
    const { css, react, nodejs } = icons
    expect(css).toBeDefined()
    expect(react).toBeDefined()
    expect(nodejs).toBeDefined()
  })
})