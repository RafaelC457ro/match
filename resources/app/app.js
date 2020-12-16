import React from 'react'
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

const Container = styled.div``

const App = () => (
  <>
    <GlobalStyle />
    <Container>
      <Header />
      <SearchCities onChange={(newValue) => console.log(newValue)} />
      <SearchLangs onChange={(newValue) => console.log(newValue)} />
    </Container>
  </>
)

export default App
