import React from 'react'
import styled from 'styled-components'

type Props = {
  color: string,
  count: number,
}

const StyledLantern = styled.div`
  height: 100%;
  background-color: ${props => props.color};
  color: ${props => (props.color === 'Black' ? 'white' : 'black')};
`

const Lantern = ({ color, count }: Props) => (
  <StyledLantern color={color}>{count}</StyledLantern>
  )

export default Lantern
