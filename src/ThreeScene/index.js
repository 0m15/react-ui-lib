import React, { Component } from "react"
import ReactDOM from 'react-dom'

import THREE from 'three'

export default class ThreeScene extends Component {
  
  static defaultProps = {
    antialias: true,
    width: 320,
    height: 240,
    fog: true,
    fogNear: 1,
    fogFar: 2000,
    fogColor: 0xffffff,
    alpha: false,
    ambientLightColor: 0xffffff,
    clearColor: 0x222222,
    fullScreen: false,
    resize: true,
    cameraZ: 750,
    cameraPerspective: 70,
    cameraNear: 1,
    cameraFar: 2000,
    initScene: (scene, camera) => {},
    animate: (scene, camera) => {}
  }

  constructor(props) { 
    // code
    super(props)

    this.scene;
    this.camera;
    this.renderer;

    this.animateScene = this.animateScene.bind(this)
  }

  componentDidMount() {
    this.initScene()
  }

  componentDidUpdate() {
    // ...
  }

  render() {
    return <div ref={(ref) => { this.node = ref }} />
  }


  // methods

  initScene() {
    const { 
      antialias,
      alpha, 
      ambientLightColor, 
      clearColor, 
      fogNear,
      fogFar,
      fogColor,
      cameraZ,
      cameraPerspective,
      cameraNear,
      cameraFar,
      width, 
      height } = this.props
    
    // SCENE    
    const scene = this.scene = new THREE.Scene()
    const camera = this.camera = new THREE.PerspectiveCamera( 
      cameraPerspective, width / height, cameraNear, cameraFar
    )
    camera.position.z = cameraZ
    scene.add( new THREE.AmbientLight( ambientLightColor) );
    scene.fog = new THREE.Fog( fogColor, fogNear, fogFar );

    this.props.initScene(scene, camera)

    // RENDERER
    const renderer = this.renderer = new THREE.WebGLRenderer({
      antialias,
      alpha
    });
    
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( width, height )
    if(!this.props.alpha) renderer.setClearColor( clearColor )  
      
    ReactDOM.findDOMNode(this.node).appendChild( renderer.domElement )

    // ANIMATE
    this.animateScene()
  }

  animateScene() {
    
    const { renderer, camera, scene } = this

    requestAnimationFrame(this.animateScene)

    this.props.animate(scene, camera)
    renderer.render(scene, camera)
  }

}
