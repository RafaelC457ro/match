import React from 'react'
import {
  render,
  screen,
  waitFor,
  fireEvent,
  within
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ExperienceField from '../ExperienceField'

describe('ExperienceField', () => {
  it('should change experience field to greater then', async () => {
    const onChange = jest.fn()
    render(<ExperienceField onChange={onChange} />)

    const select = screen.getByText('Experiencia Maior que')

    fireEvent.click(select)

    await waitFor(() => screen.getByText('Experiencia Maior que'))

    fireEvent.click(screen.getByText('Experiencia Maior que'))

    const inputStart = screen.getByTestId('start')

    fireEvent.change(inputStart, { target: { value: 1 } })

    expect(onChange).toHaveBeenCalledWith({
      startExperience: 1,
      endExperience: null
    })
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('should change experience field to between', async () => {
    const onChange = jest.fn()
    render(<ExperienceField onChange={onChange} />)

    fireEvent.mouseDown(screen.getByRole('button'))
    const listbox = within(screen.getByRole('listbox'))
    fireEvent.click(listbox.getByText(/Experiencia Entre/i))

    const inputStart = screen.getByTestId('start')

    fireEvent.change(inputStart, { target: { value: 2 } })

    const inputEnd = screen.getByTestId('end')

    fireEvent.change(inputEnd, { target: { value: 3 } })

    expect(onChange).toHaveBeenCalledWith({
      startExperience: 2,
      endExperience: 3
    })
    expect(onChange).toHaveBeenCalledTimes(3)
  })
})
