import React from 'react'
import ReactTooltip from 'react-tooltip'

type Props = {
  type: string,
  gameData: {},
}

const Dedication = ({ gameData, type }: Props) => {
  const style = {
    boxSizing: 'border-box',
    margin: 2,
    border: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    textAlign: 'center',
  }

  return (
    <div style={style}>
      <div>{gameData.dedications[type][0]}</div>
      <div>{type}</div>
      <div data-tip={gameData.dedications[type]}>{gameData.dedications[type].length} remaining</div>
      <ReactTooltip place="top" type="dark" effect="float" />
    </div>
  )
}

export default Dedication
