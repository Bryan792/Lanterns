// @flow

import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { APP_NAME } from '../config'
import { HOME_PAGE_ROUTE } from '../routes'

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
`

const HeaderLink = styled(NavLink)`
  color: black;
  text-decoration: none;
`

const Header = () =>
  <StyledHeader>
    <HeaderLink to={HOME_PAGE_ROUTE}>
      <h1>{APP_NAME}</h1>
    </HeaderLink>
  </StyledHeader>

export default Header
