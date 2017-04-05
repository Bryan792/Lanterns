import React from 'react'
import styled from 'styled-components'

import { Row } from './styled-flex'
import Lantern from './lantern'

type Props = {
player: {
},
  className: ?string,
}

// TODO this is duplicated code
const LanternContainer = styled.button`
  height: 50px;
  width: 30px;
  margin: 1px;
  border: 2px;
  border-style: solid;
  border-color: black;
`


// TODO: button here? check keys
const Player = ({ player, className }: Props) => <div className={className}>
  <h3>{player.name}</h3>

  <Row>
    {
      Object.keys(player.lanterns).sort((color1, color2) => player.lanterns[color2] - player.lanterns[color1]).map(color =>
        <LanternContainer key={color}>
          <Lantern color={color} count={player.lanterns[color]} />
        </LanternContainer>,
  )}
  </Row>
  <div>{player.favors} favors {player.points} points</div>
</div>

export default styled(Player)`
      margin-left: ${props => (props.right ? 'auto' : 0)};
      margin-right: ${props => (props.left ? 'auto' : 0)};
      border: 2px solid ${props => (props.active ? 'yellow' : 'black')};
    `
