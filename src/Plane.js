class Plane{
    constructor(x= 0, y= 0, z= 0, width= 50, height= 50, recColor="white") {
        this.x = x
        this.y = y
        this.z = z
        this.mesh = (
            <mesh position={[25, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[width, height]}/>
            <meshLambertMaterial attach="material" color={recColor}/>
          </mesh>
        )
        this.width = width
        this.height = height
        this.color = recColor
    }

    createPlane() {
        this.plane = new Plane()
        return this.plane.mesh
    }
}

export default Plane;