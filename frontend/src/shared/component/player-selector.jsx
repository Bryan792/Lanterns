// TODO: fix flow annotations
import React from 'react'

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
    shouldShowSubmit: Function,
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
      direction,
      shouldShowSubmit,
    } = this.props
    let row
    if (player) {
      row = <div>{direction} {player.name}</div>
    } else if (!shouldShowSubmit) {
      row = <div>{direction}</div>
    } else {
      row =
        (<form onSubmit={this.handleSubmit}>
          <label htmlFor="name">{direction}</label>
          <input id="name" type="text" value={this.state.name} onChange={this.handleNameChange} />
          <input type="submit" value="Submit" />
        </form>)
    }

    return (
      <div>
        {row}
      </div>
    )
  }
}

export default PlayerSelector
