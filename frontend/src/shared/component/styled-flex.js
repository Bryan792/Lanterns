// TODO: fix flow annotations
import styled from 'styled-components'

// My children are displayed in a column
export const Col = styled.div`
  display: flex;
  flex-direction: column;
`
// My children are displayed in a row
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
export const SpacedCol = styled(Col)`
  justify-content: space-between;
`

export const SpacedRow = styled(Row)`
  justify-content: space-between;
`

