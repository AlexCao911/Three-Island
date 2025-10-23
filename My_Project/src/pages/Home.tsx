import { Suspense } from 'react';
import Loader from '../components/Loader';
import { Canvas } from '@react-three/fiber'
import Island from '../components/models/Island';
// Other Version of the island 
// import IslandWithTower from '../components/models/Island_with_tower';
import Sky from '../components/models/Sky'
import Spaceship from '../components/models/Spaceship';
import Bird from "../components/models/Bird"
import { useState } from 'react';

const Home = () => {

  const[ isRotating, setIsRotating] = useState(false)

  const adjustIslandForScreenSize = () => {
    let screenScale: [number, number, number];
    const screenPosition: [number, number, number] = [0, -6.5, -43];
    const rotation: [number, number, number] = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation]
  }

  const adjustSpaceshipForScreenSize = () => {
    let screenScale: [number, number, number];
    const screenPosition: [number, number, number] = [0,-2,1.5];
    const screenRotation: [number, number, number] = [0,1.5,0]
    

    if (window.innerWidth < 768) {
      screenScale = [0.63, 0.63, 0.63];
    } else {
      screenScale = [0.63, 0.63, 0.63];
    }
    return [screenScale, screenPosition, screenRotation]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [spaceshipScale, spaceshipPosition, spaceshipRotation ] = adjustSpaceshipForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      {/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
      </div> */}

      <Canvas className='w-full h-screen bg-transparent fixed ${isRotating ? "cursor-grabbing": "cursor-grab"}' camera={{ near: 0.1, far: 1000 }} >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 1, 1]} intensity={2} />
          <hemisphereLight args={["#b1e1ff", "#000000", 1]} />

          <Bird /> 

          <Spaceship
            position={spaceshipPosition}
            scale={spaceshipScale}
            rotation={spaceshipRotation}
            isRotating={isRotating}
          />

          <Sky />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />

        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home