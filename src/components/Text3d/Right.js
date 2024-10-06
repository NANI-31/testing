import React, { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const Triangle3D = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TriangleMesh />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  )
}

const TriangleMesh = () => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    
    // Define the triangle shape
    shape.moveTo(0, 0)
    shape.lineTo(1, 0)
    shape.lineTo(0.5, Math.sqrt(3) / 2)
    shape.lineTo(0, 0)

    const extrudeSettings = {
      steps: 1,
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 3
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#FFA500" /> {/* Orange color */}
    </mesh>
  )
}

export default Triangle3D