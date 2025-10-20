import { Suspense, useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader';
import { Canvas } from '@react-three/fiber';
import { Island } from '../models';
import { TestSky } from '../models/TestSky';

const Home = () => {
  // State management
  const [currentStage, setCurrentStage] = useState<number | null>(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Audio reference (optional feature)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const adjustIslandForScreenSize = (): [[number, number, number], [number, number, number]] => {
    let screenScale: [number, number, number];
    let screenPosition: [number, number, number];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  // Audio effect (optional feature)
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlayingMusic && audio) {
      audio.play();
    }
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [isPlayingMusic]);

  return (
    <section className='w-full h-screen relative'>
      {/* Stage Information Display */}
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && (
          <div className='bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg'>
            <h2 className='text-xl font-bold text-gray-800'>
              Stage {currentStage}
            </h2>
            <p className='text-gray-600'>
              {currentStage === 1 && "Welcome to my portfolio!"}
              {currentStage === 2 && "Explore my projects"}
              {currentStage === 3 && "Learn about my skills"}
              {currentStage === 4 && "Get in touch with me"}
            </p>
          </div>
        )}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"
          }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting Setup */}
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            args={['#b1e1ff', '#000000', 1]}
          />

          {/* Fantasy Sky Background - Simple test version */}
          <TestSky isRotating={isRotating} />

          {/* Interactive Island */}
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}

            // Enhanced physics configuration
            physicsConfig={{
              damping: 0.92,        // Smoother stopping
              tension: 150,         // Spring tension
              friction: 20,         // Friction force
              mass: 1.2,           // Mass feeling
            }}

            // Interaction configuration
            interactionConfig={{
              sensitivity: 0.015,           // Rotation sensitivity
              keyboardSpeed: 0.008,         // Keyboard control speed
              enableHapticFeedback: true,   // Haptic feedback
              enableSoundEffects: false,    // Sound effects (optional)
            }}

            // Advanced features
            enableAutoRotate={false}      // Auto rotation
            enableMagneticSnap={true}     // Magnetic snap to stages
            enableParallax={false}        // Parallax effect
          />
        </Suspense>
      </Canvas>

      {/* Music Control Button (Optional) */}
      <div className='absolute bottom-2 left-2'>
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 transition-colors'
          aria-label={isPlayingMusic ? 'Mute music' : 'Play music'}
        >
          {isPlayingMusic ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Navigation Tips */}
      <div className='absolute bottom-2 right-2'>
        <div className='bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg'>
          <p className='text-sm text-gray-600'>
            🖱️ Drag to rotate • ⌨️ Arrow keys • 📱 Touch & drag
          </p>
        </div>
      </div>

    </section>
  );
};

export default Home