import React from 'react'
import Button from '@material-ui/core/Button'
import styled, { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family:'Roboto', sans-serif;
    font-size: 16px;
  }
`

// local
import Header from './components/Header/Header'
import SearchCities from './components/SearchCities/SearchCities'
import SearchLangs from './components/SearchLangs/SearchLangs'
import ExperienceField from './components/ExperienceField/ExperienceField'
import CandidateList from './components/CandidateList/CandidateList'

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
  justify-items: flex-end;
`

const App = () => (
  <>
    <GlobalStyle />
    <MainContainer>
      <Header />
      <Container>
        <SubimitContainer>
          <InputsContainer>
            <SearchCities onChange={(newValue) => console.log(newValue)} />
            <SearchLangs onChange={(newValue) => console.log(newValue)} />
            <ExperienceField onChange={(newValue) => console.log(newValue)} />
          </InputsContainer>
          <ButtonContainer>
            <Button variant="contained" color="primary">
              Buscar
            </Button>
          </ButtonContainer>
        </SubimitContainer>
        <CandidateList list={candidates} />
      </Container>
    </MainContainer>
  </>
)

export default App
