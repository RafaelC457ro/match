import React from 'react'
import axios from 'axios'
import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
  logDOM
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import SearchCity from '../SearchCities'

jest.mock('axios')

afterEach(() => {
  jest.clearAllMocks()
})

describe('SearchCities', () => {
  it('should search a city', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1100015,
          nome: "Alta Floresta D'Oeste",
          microrregiao: {
            id: 11006,
            nome: 'Cacoal',
            mesorregiao: {
              id: 1102,
              nome: 'Leste Rondoniense',
              UF: {
                id: 11,
                sigla: 'RO',
                nome: 'Rondônia',
                regiao: {
                  id: 1,
                  sigla: 'N',
                  nome: 'Norte'
                }
              }
            }
          },
          'regiao-imediata': {
            id: 110005,
            nome: 'Cacoal',
            'regiao-intermediaria': {
              id: 1102,
              nome: 'Ji-Paraná',
              UF: {
                id: 11,
                sigla: 'RO',
                nome: 'Rondônia',
                regiao: {
                  id: 1,
                  sigla: 'N',
                  nome: 'Norte'
                }
              }
            }
          }
        },
        {
          id: 1100023,
          nome: 'Ariquemes',
          microrregiao: {
            id: 11003,
            nome: 'Ariquemes',
            mesorregiao: {
              id: 1102,
              nome: 'Leste Rondoniense',
              UF: {
                id: 11,
                sigla: 'RO',
                nome: 'Rondônia',
                regiao: {
                  id: 1,
                  sigla: 'N',
                  nome: 'Norte'
                }
              }
            }
          },
          'regiao-imediata': {
            id: 110002,
            nome: 'Ariquemes',
            'regiao-intermediaria': {
              id: 1101,
              nome: 'Porto Velho',
              UF: {
                id: 11,
                sigla: 'RO',
                nome: 'Rondônia',
                regiao: {
                  id: 1,
                  sigla: 'N',
                  nome: 'Norte'
                }
              }
            }
          }
        }
      ]
    })

    const onChange = jest.fn()
    render(<SearchCity onChange={onChange} />)

    const input = screen.getByLabelText('Cidade', { selector: '#search-city' })

    fireEvent.change(input, { target: { value: 'Ariquemes' } })

    await waitForElementToBeRemoved(() => screen.getByText('Loading…'))
    await waitFor(() => screen.getByText('Ariquemes - RO'))

    const city = screen.getByText('Ariquemes - RO')

    fireEvent.click(city)

    expect(onChange).toHaveBeenCalledWith({ cities: ['Ariquemes - RO'] })
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
