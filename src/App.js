import './App.css';
import React, {useRef} from "react";
import {Canvas, useFrame} from "react-three-fiber";
import { OrbitControls, Stars, Cone } from "drei";
import { Physics, useBox, usePlane} from "use-cannon";
import { ConeBufferGeometry, PlaneBufferGeometry } from 'three';
//import gGrunt from "./Grunt.js"

function Enemy(props) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, .5, -10]
  }))
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0)
      }} 
      ref={ref} position={[0, ,.5 , -10]}>
      <boxBufferGeometry attach="geometry" args={[1,1,1]}/>
      <meshLambertMaterial attach="material" color="hotpink"/>
    </mesh>
  )
}

function Player(props) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 0.5, 1]
  }))
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 10, 0)
      }} 
      ref={ref} position={[0, 0.5, 1]}>
      <boxBufferGeometry attach="geometry" args={[1,1,1]}/>
      <meshLambertMaterial attach="material" color="orange"/>
    </mesh>
  )
}

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0]
  }))
  return(
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]}/>
      <meshLambertMaterial attach="material" color="seafoamgreen"/>
    </mesh>
  )
}

function plotLineToEnemy(x1, z1 , x2, z2) {
  var rise = z2 - z1 / 100 //gives us the horizontal distance between two points and then divides it by 100
  var run = x2 - x1 / 100 //same as above but the vertical distance between two points
  return [rise, run]
}

function Grunt(props) {
  const mesh = useRef(null)
  //var slope = plotLineToEnemy(0, -10, mesh.current.position.x, mesh.current.position.z)
  useFrame(() => (
    mesh.current.position.z -= .01
  ))
  return (
    <mesh position={[0, 0.25, 2]} ref={mesh}>
      <coneBufferGeometry attach="geometry" args={[.25, .5, 6]}/>
      <meshLambertMaterial attach="material" color="yellow"/>
    </mesh>
  )
}
// function Grunt(props) {
//   var grunt = new gGrunt()
//   return grunt.mesh
// }

function App() {
  return (
    <Canvas>
      <Stars/>
      <Physics>
        <Enemy/>
        <Player/>
        <Plane/>
        <Grunt/>
      </Physics>
      <OrbitControls/>
      <ambientLight/>
      <spotLight
        position={[10,15,10]}
        angle={0.3}
      />
    </Canvas>
  );
}

export default App;
