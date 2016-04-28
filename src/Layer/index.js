import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Layer extends Component {

  render() {
    return null
  }

  _renderLayer() {
    let layer = null
    if(this.props.children) {
      layer = (
        <div {...this.props}>
          {this.props.children}
        </div>
      )
    }

    layer ? ReactDOM.render(layer, this.layerNode) : ReactDOM.render(<noscript/>, this.layerNode)
  }

  _unrenderLayer() {
    if(this.props.layerWillUnmount) {
      this.props.layerWillUnmount(this.layerNode);
    }

    ReactDOM.unmountComponentAtNode(this.layerNode);
  }

  componentDidMount() {
    this.layerNode = document.createElement('div')
    document.body.appendChild(this.layerNode)
    this._renderLayer()
  }

  componentDidUpdate() {
    this._renderLayer()
  }

  componentWillUnmount() {
    this._unrenderLayer();
    document.body.removeChild(this.layerNode);
  }
}