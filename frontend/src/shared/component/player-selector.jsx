// TODO: fix flow annotations
import React from 'react'

class PlayerSelector extends React.Component {
  constructor(props: props) {
    super(props)
    this.state = {
      direction: 'NORTH',
      name: '',
    }
    this.handleDirectionChange = this.handleDirectionChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state: {
    direction: string,
    name: string,
  }

  props: {
    handleSubmit: Function,
  }

  handleDirectionChange(event: Event) {
    this.setState({
      direction: event.target.value,
    })
  }

  handleNameChange(event: Event) {
    this.setState({
      name: event.target.value,
    })
  }

  handleSubmit(event: Event) {
    this.props.handleSubmit(this.state.direction, this.state.name)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.direction} onChange={this.handleDirectionChange}>
          <option value="NORTH">North</option>
          <option value="EAST">East</option>
          <option value="SOUTH">South</option>
          <option value="WEST">West</option>
        </select>
        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default PlayerSelector
