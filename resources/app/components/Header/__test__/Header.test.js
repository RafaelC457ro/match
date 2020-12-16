import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Header from '../Header'

describe('Header', () => {
  it('should render a header', () => {
    render(<Header />)

    expect(screen.getByRole('header')).toHaveTextContent('Geek Match')
  })
})
