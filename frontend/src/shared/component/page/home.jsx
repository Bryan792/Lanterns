// @flow

import React from 'react'
import Helmet from 'react-helmet'

import { APP_NAME } from '../../config'
import SearchBar from '../searchbar'

const HomePage = () =>
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Lanterns' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <h1>{APP_NAME}</h1>
    <SearchBar />
  </div>

export default HomePage
