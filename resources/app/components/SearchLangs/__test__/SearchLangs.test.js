import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import SearchLangs from '../SearchLangs'

describe('SearchLangs', () => {
  it('should search a programming language', async () => {
    const onChange = jest.fn()
    render(<SearchLangs onChange={onChange} />)

    const input = screen.getByLabelText('Linguagens', {
      selector: '#search-lang'
    })

    fireEvent.change(input, { target: { value: 'Javascript' } })

    await waitFor(() => screen.getByText('JavaScript'))

    const city = screen.getByText('JavaScript')

    fireEvent.click(city)

    expect(onChange).toHaveBeenCalledWith({ languages: ['JavaScript'] })
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
