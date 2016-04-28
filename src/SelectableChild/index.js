import React, { Component, PropTypes } from 'react'

// a component that bind every child to an onClick event
// so that the child index becomes "selected" 
// useful for Navigations, Search-as-you-type, etc.
export default class SelectableChild extends Component {

  static propTypes = {
    onSelect: PropTypes.func
  };

  constructor(props) {
    super(props)
    this.state = {
      selectedIdx: null
    }
  }

  render() {
    return (
      <div {...this.props}> 
        {React.Children.map(this.props.children, (child, idx) =>
          React.cloneElement(child, {
            onClick: this.click.bind(this, idx, child), 
            active: this.isActive(idx),
            ...child.props
          })
        )}
    </div>)
  }

  isActive(idx) {
    const { selectedIdx } = this.state
    const { initialSelectedIdx } = this.props
    return ((!selectedIdx && initialSelectedIdx==idx) || (selectedIdx==idx))
  }

  click(idx, child, evt) {
    this.setState({selectedIdx:idx})
    this.props.preventDefault && evt.preventDefault()
    this.props.onSelect && this.props.onSelect(child.props)
    child.props.onClick && child.props.onClick()
  }
}