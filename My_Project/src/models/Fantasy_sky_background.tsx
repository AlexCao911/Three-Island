import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FantasySkyProps {
  isRotating?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

interface GLTFResult {
  nodes: {
    Object001_Material__25__background_JPG_002_0: THREE.Mesh;
  };
  materials: {
    Material__25__background_JPG_002: THREE.Material;
  };
  scene: THREE.Group;
}

export function FantasySkyBackground({ isRotating = false, ...props }: FantasySkyProps) {
  const { scene } = useGLTF("/fantasy_sky_background-transformed.glb") as unknown as GLTFResult;
  const skyRef = useRef<THREE.Group>(null);

  // Frame animation - Control sky rotation based on island rotation state
  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.1 * delta; // Slow rotation for sky
    }
  });

  // Configure all materials in the scene for proper skybox rendering
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          // Configure for skybox rendering
          material.side = THREE.BackSide; // Render from inside
          material.depthWrite = false; // Don't interfere with depth buffer
          material.depthTest = false; // Always render behind everything

          // Ensure proper lighting
          if (material.map) {
            material.map.flipY = false; // Fix texture orientation if needed
          }
        }
      });
    }
  }, [scene]);

  return (
    <group
      ref={skyRef}
      {...props}
      dispose={null}
      position={[0, 0, 0]}
      scale={[50, 50, 50]} // Large scale for skybox effect
      renderOrder={-1000} // Render first (behind everything)
    >
      {/* Method 1: Use the entire scene */}
      <primitive object={scene} />

      {/* Method 2: Use specific mesh (alternative approach) */}
      {/* <mesh
        geometry={nodes.Object001_Material__25__background_JPG_002_0.geometry}
        material={materials.Material__25__background_JPG_002}
        renderOrder={-1000}
      /> */}
    </group>
  );
}

// Preload the GLTF model
useGLTF.preload("/fantasy_sky_background-transformed.glb");
