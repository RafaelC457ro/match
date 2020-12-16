import React from 'react'
import styled from 'styled-components'

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #6e2b77;
  height: 60px;
  padding-left: 15px;
`

const Logo = styled.div`
  color: #ffff;
  font-size: 1.6em;
`

const Header = () => (
  <Container role="header">
    <Logo>Geek Match</Logo>
  </Container>
)

export default Header
