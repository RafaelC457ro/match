import React from 'react'
import { render, screen, logDOM } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import CandidateList from '../CandidateList'

describe('CandidateList', () => {
  it('should render a candidate list', async () => {
    const candidates = [
      {
        id: 1,
        name: 'João das Neves',
        city: 'Florianópolis - SC',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'Javacript',
            is_main_tech: true
          }
        ]
      },
      {
        id: 3,
        name: 'Vitor Carvalho',
        city: 'Florianópolis - SC',
        start_experience: 2,
        end_experience: null,
        technologies: [
          {
            name: 'Elixir',
            is_main_tech: true
          }
        ]
      }
    ]
    const { container } = render(<CandidateList list={candidates} />)

    expect(container).toBeInTheDocument()
  })
})
