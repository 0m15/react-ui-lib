import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class DetectClickOutside extends Component {

  render() {
    return <div ref="area" {...this.props}>{this.props.children}</div>
  }

  componentDidMount() {
    this._clickListener = this.onDocumentClick.bind(this)
    this._keydownListener = this.onDocumentKeyDown.bind(this)
    document.addEventListener('click', this._clickListener)
    document.addEventListener('keydown', this._keydownListener)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._clickListener)
    document.removeEventListener('keydown', this._keydownListener)
  }

  onDocumentClick(evt) {
    const area = ReactDOM.findDOMNode(this.refs.area)
    if (area && !area.contains(evt.target)) {
      this.props.onClickOutside && this.props.onClickOutside(evt)
    }
  }

  onDocumentKeyDown(event) {
    const { onEscPress } = this.props
    if(event.keyCode === 27) {
      onEscPress && onEscPress()
    }
  }

}