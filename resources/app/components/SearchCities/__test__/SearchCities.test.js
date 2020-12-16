import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import SearchCity from '../SearchCity'

describe('Header', async () => {
  it('should render a header', () => {
    const onChange = jest.fn()
    render(<SearchCity onChange={onChange} />)

    const input = screen.getAllByRole('search')

    fireEvent.change(input, { target: { value: 'Florianópolis' } })

    await waitFor(() => screen.getAllByText('Florianópolis - SC'));

    const city = screen.getAllByText('Florianópolis - SC')

    fireEvent.click(city)

    expect(onChange).toHaveBeenCalledWith({ city: 'Florianópolis - SC' })
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
