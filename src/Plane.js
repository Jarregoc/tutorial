class Plane{
    constructor(x= 0, y= 0, z= 0) {
        this.x = x
        this.y = y
        this.z = z
        this.mesh = (
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[50, 50]}/>
            <meshLambertMaterial attach="material" color="seafoamgreen"/>
          </mesh>
        )
    }

    createPlane() {
        this.plane = new Plane()
        return this.plane.mesh
    }
}

export default Plane;