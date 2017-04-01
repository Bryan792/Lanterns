// @flow

import React from 'react'
import { NavLink } from 'react-router-dom'

import { APP_NAME } from '../config'
import { HOME_PAGE_ROUTE } from '../routes'

const Header = () =>
  <header style={{ textAlign: 'center' }}>
    <NavLink to={HOME_PAGE_ROUTE} style={{ color: 'black', textDecoration: 'none' }}>
      <h1>{APP_NAME}</h1>
    </NavLink>
  </header>

export default Header
