class Grunt {
    constructor(x= 0, z= 2) {
        this.x = x
        this.y = .25
        this.z = z
        this.mesh = (
            <mesh position={[this.x, this.y, this.z]}>
                <coneBufferGeometry attach="geometry" args={[.25, .5, 6]}/>
                <meshLambertMaterial attach="material" color="yellow"/>
            </mesh>
        )
        // return this.mesh
    }

    createGrunt(x, z) {
        this.grunt = new Grunt()
        return this.grunt.mesh
    }
}

export default Grunt;