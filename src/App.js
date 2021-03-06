import './App.css';
import React, { useRef} from "react";
import {Canvas, useFrame} from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import { Physics, useBox, usePlane} from "use-cannon";
import { ConeBufferGeometry, PlaneBufferGeometry } from 'three';
import Grunt from "./Grunt.js"
import Plane from "./Plane.js"

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

function Plane1(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0]
  }))
  return(
    <mesh position={[25, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[50, 50]}/>
      <meshLambertMaterial attach="material" color="seafoamgreen"/>
    </mesh>
  )
}

function Plane2(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0]
  }))
  return(
    <mesh position={[-25, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[50, 50]}/>
      <meshLambertMaterial attach="material" color="black"/>
    </mesh>
  )
}


function plotLineToEnemy(x1, z1 , x2, z2) {
  var rise = z2 - z1 / 100 //gives us the horizontal distance between two points and then divides it by 100
  var run = x2 - x1 / 100 //same as above but the vertical distance between two points
  return [rise, run]
}

// function Grunt(props) {
//   const mesh = useRef(null)
//   //var slope = plotLineToEnemy(0, -10, mesh.current.position.x, mesh.current.position.z)
//   useFrame(() => (
//     mesh.current.position.z -= .00
//   ))
//   return (
//     <mesh position={[0, 0.25, 2]} ref={mesh}>
//       <coneBufferGeometry attach="geometry" args={[.25, .5, 6]}/>
//       <meshLambertMaterial attach="material" color="yellow"/>
//     </mesh>
//   )
// }
function ConeGrunt(props) {
  var grunt = new Grunt()
  return grunt.mesh
}

function CreatePlane(props) {
  var plane = new Plane(0, 0, 0, 10, 10, "black")
  CreateBoard()
  return plane.mesh
}

function CreateBoard(props) {
  //1.create array of plane objects
  var rectangles = []
  let x = -50, y = 0, z = 100
  let color = "black"
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if(i % 2 == j % 2) {
        color = "white"
      }
      else {
        color = "black"
      }
      rectangles.push(new Plane(x, y, z, 10, 10, color))
      console.log("coordinates for " + i + "" + j + "th Plane are: (" + x + ", " + z + ") and the color is: " + color + "\n")
      if(z > 10) {
        z -= 10
      }
      else {
        z = 100
      }
    }
    if(x < 40) {
    x+=10
    }
    else {
    x = -50
    }
  }
  
  // for(let i = 0; i < 100; i++) {
  //   if(i % 2 == 0) {
  //     color = "white"
  //   }
  //   else {
  //     color = "black"
  //   }
  //   rectangles.push(new Plane(x, y ,z, 10, 10, color)) //adds new Plane to board
  //   console.log("coordinates for " + i + "th Plane are: (" + x + ", " + z + ") and the color is: " + color + "\n")
  //   if(x <= 40) {
  //     x+=10
  //   }
  //   else {
  //     x = -50
  //   }
  //   if(z <= 90) {
  //     z+=10
  //   }
  //   else {
  //     z = 0
  //   }
  // }
  //2.Map the array of plane objects to a mesh jsx component for react to use
  return (
    <group>
      {rectangles.map((plane) => (
        <mesh position={[plane.x, plane.y, plane.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry attach="geometry" args={[plane.width, plane.height]}/>
          <meshLambertMaterial attach="material" color={plane.recColor}/>
        </mesh>
      ))}
    </group>

  )
  // return (
  //   <board>
  //     <planeBufferGeometry attach="geometry"/>
  //     <meshLambertMaterial attach="material" color="seafoamgreen"/>
  //   </board>

  // )
}


function App() {
  return (
    <Canvas>
      <Stars/>
      <Physics>
        <Enemy/>
        <Player/>
        <CreatePlane/>
        {/* <Plane2/> */}
        <ConeGrunt/>
        <CreateBoard/>
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
