import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  * + * {
    margin-left: 5px;
  }
`

const ExperienceField = ({ onChange }) => {
  const [type, setType] = useState('greaterThen')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  useEffect(() => {
    onChange({
      startExperience: start,
      endExperience: type == 'between' ? end : null
    })
  }, [start, end])

  return (
    <Container>
      <Select
        label="Experiencia"
        id="experience-select"
        value={type}
        variant="outlined"
        data-testid="experience-select"
        onChange={(event) => {
          setType(event.target.value)
        }}
      >
        <MenuItem value={'greaterThen'}>Experiencia Maior que</MenuItem>
        <MenuItem value={'between'}>Experiencia Entre</MenuItem>
      </Select>

      <TextField
        variant="outlined"
        type="number"
        inputProps={{
          min: '0',
          pattern: '[0-9]{10}',
          'data-testid': 'start'
        }}
        value={start}
        id="input-start"
        onChange={(event) => {
          setStart(Number(event.target.value))
        }}
      />
      {type == 'between' ? (
        <TextField
          variant="outlined"
          type="number"
          id="input-end"
          value={end}
          onChange={(event) => {
            setEnd(Number(event.target.value))
          }}
          inputProps={{
            min: '0',
            pattern: '[0-9]{10}',
            'data-testid': 'end'
          }}
        />
      ) : null}
    </Container>
  )
}

export default ExperienceField
