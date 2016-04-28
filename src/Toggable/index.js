import React, { Component } from 'react'
import Transition from 'react-motion-ui-pack'
import { spring } from 'react-motion'

export default class Toggle extends Component {

  constructor(props) {
    super(props)
    const initialShow = (typeof props.initialShow === "undefined") ? false : props.initialShow
    this.state = { isShown: initialShow }
  }

  toggle() {
    this.setState({ isShown: !this.state.isShown })
  }

  render() {
    return (
      <div {...this.props}>
        <div onClick={this.toggle.bind(this)}>TOGGLE</div>
        <Transition
          component={false} // don't use a wrapping component
          enter={{
            opacity: spring(1),
            height: spring(200) // TODO pass a custom spring config
          }}
          leave={{
            opacity: spring(0),
            height: spring(0)
          }}
        >
          {this.state.isShown &&
            <div key="modal" className="modal__content">
              i should animate
            </div>}
        </Transition>
      </div>
    )
  }

}