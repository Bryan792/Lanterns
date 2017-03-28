// TODO: fix flow annotations
import React from 'react'
import { withRouter } from 'react-router'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  props: {
    history: {
      push: Function
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    this.props.history.push(this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default withRouter(SearchBar)
