import { Suspense } from 'react';
import Loader from '../components/Loader';
import { Canvas } from '@react-three/fiber'
import Island from '../components/models/Island';
// Other Version of the island 
// import IslandWithTower from '../components/models/Island_with_tower';

const Home = () => {

  const adjustIslandForScreenSize = () => {
      let screenScale: [number,number,number];
      const screenPosition: [number,number,number] = [0, -6.5, -43];
      const rotation: [number,number,number] = [0.1, 4.7, 0];

      if ( window.innerWidth < 768 ) {
        screenScale = [0.9, 0.9, 0.9];
      } else {
        screenScale = [1, 1, 1];
      }
      return [screenScale, screenPosition, rotation]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'> Home
        {/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        </div> */}

        <Canvas className='w-full h-screen bg-transparent' camera={{near: 0.1, far: 1000}} >
            <Suspense fallback={<Loader />}>
                <ambientLight />
                <directionalLight />
                <hemisphereLight />

                <Island
                  position={islandPosition}
                  scale={islandScale}
                  rotation={islandRotation}
                />


                
            </Suspense>
        </Canvas>
    </section>
  )
}

export default Home