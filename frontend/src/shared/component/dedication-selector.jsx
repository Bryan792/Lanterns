import React from 'react'

import Lantern from './lantern'
import Button from './button'

type Props = {
type: string,
possibleDedications: [],
onDedicationSelected: Function,
}

const DedicationSelector = ({ type, possibleDedications, onDedicationSelected }: Props) => (
  <div>

    {possibleDedications.map(lanterns => <div
      style={{
        display: 'flex',
      }} key={Object.keys(lanterns)}
    >

      {
      Object.keys(lanterns).map(color => <div
        style={{
          height: 70,
          width: 40,
          borderStyle: 'solid',
          border: 2,
          margin: 2,
          borderColor: 'black',
          boxSizing: 'border-box',
        }}
        key={color}
      >
        <Lantern color={color} count={lanterns[color]} />
      </div>,
      )}

      <Button
        label="Buy" handleClick={() => {
          onDedicationSelected(type, lanterns)
        }}
      />

    </div>)}
  </div>
  )

export default DedicationSelector
