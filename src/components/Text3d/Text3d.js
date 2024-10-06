import React, {memo} from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Canvas } from '@react-three/fiber'
import { Center, Text3D, OrbitControls, MeshTransmissionMaterial, Float, Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'

export default function Text3d () {
  return (
    <div className='aboutBody'>
        <h1>hbluh</h1>
      <CanvasFun />
    </div>
  )
}

function CanvasFun() {
    const config = {
        backside: true,
        backsideThickness: .3,
        transmission: 1,
        thickness: .3,
        chromaticAberration: 5,
        ior: 1.5,
        color: '#9b81de',
        side: THREE.DoubleSide,
        roughness: 0.1,
        metalness: 0.5,
        reflectivity: 0.5,
        refractionRatio: 0.98,  
    }
    return (
        <Canvas camera={{position: [0, 0, 6]}} style={{height: '100vh', width: '100vw', backgroundColor: 'black'}}>
            <Float speed={2} rotationIntensity={1}>
                <Text config={config} position={[0, -1.5, 0]}>NANI</Text>
                <Stars count={400} speed={5} saturation={0} />
                <Environment preset='warehouse' blur={.5}/>
                <axesHelper args={[0]}/>
                {/* <OrbitControls enableZoom={false}/> */}
            </Float>
        </Canvas>
    )
}
function Text({ children, config, ...props }) {
  return (
    <>
        <group>
            <Center scale={[0.8, 1, 1]} front top {...props}>
                <Text3D
                    font= '/Roblox Black Round_Regular.json'
                    scale={3}
                    letterSpacing={-.03}
                    height={0.25}
                    bevelEnabled
                    bevelSize={.02}
                    bevelThickness={0.01}
                    bevelSegments={10}
                    curveSegments={128}
                    >
                    {children}
                    <MeshTransmissionMaterial {...config}/>
                </Text3D>
            </Center>   
        </group>
    </>
  )
}




