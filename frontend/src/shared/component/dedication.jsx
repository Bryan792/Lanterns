import React from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

type Props = {
  type: string,
  gameData: {},
}

const Dedication = ({ gameData, type }: Props) => {
  const Card = styled.div`
    margin: 2px;
    border: 2px solid black;
    text-align: center;
    background-color: #DCD3BA;
  `

  return (
    <Card>
      <div>{gameData.dedications[type][0]}</div>
      <div>{type}</div>
      <div data-tip={gameData.dedications[type]}>{gameData.dedications[type].length} remaining</div>
      <ReactTooltip place="top" type="dark" effect="float" />
    </Card>
  )
}

export default Dedication
