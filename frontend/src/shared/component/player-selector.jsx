// TODO: fix flow annotations
import React from 'react'
import styled from 'styled-components'

const NameInput = styled.input`
  font-size: 1.3em;
`

const NameSubmit = styled.input`
  font-size: 1.3em;
`

const Name = styled.div`
  font-size: 1.3em;
`

class PlayerSelector extends React.Component {
  constructor(props: props) {
    super(props)
    this.state = {
      name: '',
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state: {
    name: string,
  }

  props: {
    handleSubmit: Function,
    player: ?{name: string},
    direction: string,
    shouldShowSubmit: boolean,
    className: ?string,
  }

  handleNameChange(event: Event) {
    this.setState({
      name: event.target.value,
    })
  }

  handleSubmit(event: Event) {
    this.props.handleSubmit(this.props.direction, this.state.name)
    event.preventDefault()
  }

  render() {
    const {
      player,
      shouldShowSubmit,
      className,
    } = this.props
    let row
    if (player) {
      row = <Name>{player.name}</Name>
    } else if (!shouldShowSubmit) {
      row = null
    } else {
      row =
        (<form onSubmit={this.handleSubmit}>
          <NameInput type="text" placeholder="Player Name" value={this.state.name} onChange={this.handleNameChange} />
          <NameSubmit type="submit" value="Join" />
        </form>)
    }

    return (
      <div className={className}>
        {row}
      </div>
    )
  }
}

export default PlayerSelector
