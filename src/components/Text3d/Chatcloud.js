import React, { memo, useMemo } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Center, OrbitControls, MeshTransmissionMaterial, Float, Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'

const Chatcloud = () => {
  return (
    <div style={{ width: '100%', height: '100vh', 
    // backgroundColor: 'black' 
    }}>
      <Canvas camera={{ position: [0, 0, 6] }}>
        {/* <Float speed={2} rotationIntensity={1}> */}
          <CloudBubble position={[0, 0, -0.5]} />
          <Dots />
          {/* <Stars count={400} speed={5} saturation={0} /> */}
          <Environment preset='warehouse'/>
          {/* <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={5} /> */}
          <OrbitControls/>
        {/* </Float> */}
      </Canvas>
    </div>
  )
}

const CloudBubble = memo(({ ...props }) => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const width = 4
    const height = 2.5
    const radius = 0.3
    const triangleSize = 2

    // Main rectangle
    shape.moveTo(0, radius)
    shape.lineTo(0, height - radius)
    shape.quadraticCurveTo(0, height, radius, height)
    shape.lineTo(width - radius, height)
    shape.quadraticCurveTo(width, height, width, height - radius)
    shape.lineTo(width, -0.6)
    shape.lineTo(3.2, 0)
    // shape.quadraticCurveTo(width, 0, width - radius, 0)
    
    // Right-angle triangle
    // shape.lineTo(width-height)
    // shape.quadraticCurveTo(width, 0, width - radius, 0)

    // Complete the shape
    shape.lineTo(radius, 0)
    shape.quadraticCurveTo(0, 0, 0, radius)

    const extrudeSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.2,
      bevelSegments: 10
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  // Create a gradient texture
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const context = canvas.getContext('2d')
    const gradient = context.createLinearGradient(0, 0, 256, 256)
    gradient.addColorStop(0, '#171717')
    gradient.addColorStop(1, '#807e7e')
    context.fillStyle = gradient
    context.fillRect(0, 0, 256, 256)
    return new THREE.CanvasTexture(canvas)
  }, [])

  const config = {
    // backside: true,
    // backsideThickness: .3,
    // transmission: 1,
    // thickness: .3,
    // roughness: 0.1,
    // envMapIntensity: 1,
    // chromaticAberration: 0.1,
    // ior:1.5,
    // side: THREE.DoubleSide,
    roughness: 0.1,
    metalness: 1,
    reflectivity: 0.5,
    refractionRatio: 0.98,  
    transparent: true,
    // opacity: 0.2,
    // depthWrite: false,
    // clearcoat: 1,
    // clearcoatRoughness: 0.1,
    // anisotropy: 0.1,
    // color: 'blue',
    // background-image: linear-gradient(to bottom right, red, yellow);
    map: gradientTexture // Use the gradient texture as a map
  }
  return (
    <mesh geometry={geometry} {...props}>
      {/* <MeshTransmissionMaterial {...config} /> */}
      <meshStandardMaterial {...config} /> 
    </mesh>
  )
})

const Dots = memo(() => {
  const dotPositions = [
    [1, 1.2, 0.25],
    [2, 1.2, 0.25],
    [3, 1.2, 0.25]
  ]
  const config = {
    backside: true,
    backsideThickness: .3,
    // transmission: 1,
    thickness: .3,
    roughness: 0.1,
    envMapIntensity: 1,
    chromaticAberration: 0.1,
    ior:1.5,
    side: THREE.DoubleSide,
    roughness: 0.1,
    // metalness: 1,
    reflectivity: 0.5,
    refractionRatio: 0.98,  
    transparent: true,
    // opacity: 0.2,
    // depthWrite: false,
    // clearcoat: 1,
    // clearcoatRoughness: 0.1,
    // anisotropy: 0.1,
    color:"#e7a63f",
    // background-image: linear-gradient(to bottom right, red, yellow);
   
  }

  return (
    <>

      {dotPositions.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial {...config} />
        </mesh>
      ))}
    </>
  )
})



export default Chatcloud
