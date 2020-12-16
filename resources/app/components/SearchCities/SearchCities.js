import axios from 'axios'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

const SearchCity = ({ onChange }) => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0

  React.useEffect(() => {
    const getCities = async () => {
      try {
        const response = await axios.get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/municipios'
        )

        const cities = response.data.map(
          (city) =>
            `${city.nome} - ${city['regiao-imediata']['regiao-intermediaria']['UF']['sigla']}`
        )

        setOptions(cities)
      } catch (error) {}
    }

    getCities()
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      multiple
      limitTags={2}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      id="search-city"
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      onChange={(event, value) => onChange({ cities: value })}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}

export default SearchCity
