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

const Container = styled.div``

const App = () => (
  <>
    <GlobalStyle />
    <Container>
      <Header />
    </Container>
  </>
)

export default App
