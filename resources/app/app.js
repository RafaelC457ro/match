import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import styled, { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family:'Roboto', sans-serif;
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }
`

// local
import Header from './components/Header/Header'
import SearchCities from './components/SearchCities/SearchCities'
import SearchLangs from './components/SearchLangs/SearchLangs'
import ExperienceField from './components/ExperienceField/ExperienceField'
import CandidateList from './components/CandidateList/CandidateList'
import { getCandidates } from './http/candidates'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  width: 1200px;
  padding-top: 15px;
`

const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  * {
    flex: 1;
  }
`

const SubimitContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`

const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const App = () => {
  const [loading, setLoading] = useState(false)
  const [candidates, setCandidates] = useState([])
  const [cities, setCities] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [experience, setExperience] = useState([])

  const getData = async (filter) => {
    setLoading(true)
    const { candidates } = await getCandidates(filter)
    setCandidates(candidates)
    setLoading(false)
  }

  const handleSearch = async () => {
    await getData({
      cities: cities.cities ? cities.cities : null,
      technologies: technologies.languages ? technologies.language : null,
      experience
    })
  }

  useEffect(() => {
    getData({ cities: null, technologies: null, experience: null })
  }, [])

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Header />
        <Container>
          <SubimitContainer>
            <InputsContainer>
              <SearchCities onChange={(newValue) => setCities(newValue)} />
              <SearchLangs onChange={(newValue) => setTechnologies(newValue)} />
              <ExperienceField
                onChange={(newValue) => setExperience(newValue)}
              />
            </InputsContainer>
            <ButtonContainer>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </ButtonContainer>
          </SubimitContainer>
          {loading ? 'Loading...' : <CandidateList list={candidates} />}
        </Container>
      </MainContainer>
    </>
  )
}

export default App
