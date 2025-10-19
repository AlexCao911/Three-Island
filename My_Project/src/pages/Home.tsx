import { Suspense } from 'react';
import Loader from '../components/Loader';
import { Canvas } from '@react-three/fiber'

const Home = () => {
  return (
    <section className='w-full h-screen relative'>Home
        <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        </div>
        <Canvas className='w-full h-screen bg-transparent' camera={{near: 0.1, far: 1000}} >
            <Suspense fallback={<Loader />}>
                <ambientLight />
                <directionalLight />
                <hemisphereLight />
            </Suspense>
        </Canvas>
    </section>
  )
}

export default Home