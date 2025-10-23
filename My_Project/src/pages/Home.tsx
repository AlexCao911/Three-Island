import { Suspense, useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';
import { Canvas, useThree } from '@react-three/fiber'
import Island from '../components/models/Island';
// Other Version of the island 
// import IslandWithTower from '../components/models/Island_with_tower';
import Sky from '../components/models/Sky'
import Spaceship from '../components/models/Spaceship';
import Bird from "../components/models/Bird"

// Camera controller component to handle dynamic camera updates
function CameraController({ distance }: { distance: number }) {
  const { camera } = useThree();

  useEffect(() => {
    // Update camera position when distance changes
    camera.position.setZ(distance);
    camera.updateProjectionMatrix();
  }, [camera, distance]);

  return null;
}

const Home = () => {
  // State management for interactions
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState<number | null>(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Audio reference for background music
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Camera zoom control state - using camera position instead of FOV
  const [cameraDistance, setCameraDistance] = useState(20); // Initial camera Z position
  const lastTouchDistance = useRef<number>(0);
  const isZooming = useRef(false);


  // Initialize audio on component mount
  useEffect(() => {
    // You can add your audio file here
    // audioRef.current = new Audio('/assets/audio/background-music.mp3');
    // if (audioRef.current) {
    //   audioRef.current.volume = 0.4;
    //   audioRef.current.loop = true;
    // }
  }, []);

  // Handle music play/pause
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlayingMusic) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [isPlayingMusic]);

  // Camera zoom control functions - using camera position for real zoom effect
  useEffect(() => {
    // Enhanced wheel zoom control supporting MacBook trackpad pinch gestures
    const handleWheel = (event: WheelEvent) => {
      // Detect MacBook trackpad pinch gestures
      const isPinchGesture = event.ctrlKey || event.metaKey;

      // Detect if this is likely a trackpad (smooth scrolling with small deltaY values)
      const isTrackpad = Math.abs(event.deltaY) < 50 && event.deltaMode === 0;

      // Always prevent default for zoom operations
      if (isPinchGesture || isTrackpad || Math.abs(event.deltaY) > 0) {
        event.preventDefault();

        let zoomSpeed = 2; // Default zoom speed

        // Adjust zoom speed based on input type
        if (isPinchGesture) {
          // MacBook trackpad pinch gesture (Cmd/Ctrl + scroll)
          zoomSpeed = 1.5;
        } else if (isTrackpad) {
          // MacBook trackpad smooth scrolling
          zoomSpeed = 0.3;
        } else if (Math.abs(event.deltaY) > 100) {
          // Mouse wheel or fast scroll
          zoomSpeed = 3;
        }

        const delta = event.deltaY > 0 ? zoomSpeed : -zoomSpeed;

        setCameraDistance(prev => {
          const newDistance = prev + delta;
          return Math.max(5, Math.min(50, newDistance));
        });
      }
    };

    // Touch pinch zoom for mobile
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        isZooming.current = true;
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        lastTouchDistance.current = distance;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2 && isZooming.current) {
        event.preventDefault();
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        const deltaDistance = distance - lastTouchDistance.current;
        const zoomSpeed = 0.05; // Adjusted for camera position
        const zoomDelta = deltaDistance * zoomSpeed; // Positive for natural pinch behavior

        setCameraDistance(prev => {
          const newDistance = prev - zoomDelta; // Subtract to make pinch-in zoom in
          return Math.max(5, Math.min(50, newDistance));
        });

        lastTouchDistance.current = distance;
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.touches.length < 2) {
        isZooming.current = false;
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Responsive sizing functions with enhanced mobile support
  const adjustIslandForScreenSize = () => {
    let screenScale: [number, number, number];
    let screenPosition: [number, number, number];
    const rotation: [number, number, number] = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4]; // Slightly adjusted for mobile
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43];
    }
    return [screenScale, screenPosition, rotation]
  }

  const adjustSpaceshipForScreenSize = () => {
    let screenScale: [number, number, number];
    const screenPosition: [number, number, number] = [0, -7, -15];
    const screenRotation: [number, number, number] = [0, 1.5, 0]

    if (window.innerWidth < 768) {
      screenScale = [1.6, 1.6, 1.6];
    } else {
      screenScale = [1.6, 1.6, 1.6];
    }
    return [screenScale, screenPosition, screenRotation]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [spaceshipScale, spaceshipPosition, spaceshipRotation] = adjustSpaceshipForScreenSize();



  return (
    <section className='w-full h-screen relative'>
      {/* Enhanced stage information display */}
      <HomeInfo currentStage={currentStage} />

      {/* Interaction hints */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-gray-500/30 shadow-xl p-4 text-gray-200 text-sm">
          <p>🖱️ Drag to rotate</p>
          <p>⌨️ Arrow keys or WASD</p>
          <p>🔍 Scroll wheel to zoom</p>
          <p>🤏 Trackpad pinch to zoom</p>
          <p>📱 Touch & pinch to zoom</p>
        </div>
      </div>

      {/* Music toggle (optional) */}
      {audioRef.current && (
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            className="bg-black/20 backdrop-blur-md rounded-2xl border border-gray-500/30 shadow-xl p-3 text-gray-200 hover:bg-gray-700/40 hover:text-gray-100 transition-all duration-300"
          >
            {isPlayingMusic ? "🔊" : "🔇"}
          </button>
        </div>
      )}

      <Canvas
        className={`w-full h-screen bg-transparent fixed ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{
          near: 0.1,
          far: 1000,
          fov: 45, // Fixed FOV
          position: [0, 0, 20] // Initial position, will be controlled by CameraController
        }}
        shadows // Enable shadows for better visual quality
      >
        <Suspense fallback={<Loader />}>
          {/* Camera controller for dynamic zoom */}
          <CameraController distance={cameraDistance} />

          {/* Enhanced lighting setup inspired by JOSHUA's World */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <hemisphereLight args={["#b1e1ff", "#000000", 0.8]} />
          <pointLight position={[10, 5, 10]} intensity={0.5} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />

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
            setCurrentStage={setCurrentStage}
          />

        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home