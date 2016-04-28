import React, { Component } from 'react'
import moment from 'moment'

export default class Moment extends Component {

  static defaultProps = {
    formatFn: 'fromNow',
    format: null,
    args: true
  };

  formatTime() {
    const { format, formatFn, value, args } = this.props
    return moment(value)[formatFn](format, true)
  }

  render() {

    return (
      <time {...this.props} dateTime={this.props.value}>
        {this.formatTime()}
      </time>
    )

  }
}