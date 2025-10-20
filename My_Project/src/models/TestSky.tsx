import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface TestSkyProps {
  isRotating?: boolean;
}

export function TestSky({ isRotating = false }: TestSkyProps) {
  const gltf = useGLTF("/fantasy_sky_background-transformed.glb");

  // Simple approach: just render the scene as-is with basic configuration
  if (gltf.scene) {
    // Clone the scene to avoid modifying the original
    const skyScene = gltf.scene.clone();
    
    // Configure all materials
    skyScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;
        material.side = THREE.DoubleSide; // Render both sides
        material.depthWrite = false;
      }
    });

    return (
      <group 
        position={[0, 0, 0]}
        scale={[20, 20, 20]}
        rotation={[0, isRotating ? Math.PI * 0.1 : 0, 0]}
      >
        <primitive object={skyScene} />
      </group>
    );
  }

  return null;
}

useGLTF.preload("/fantasy_sky_background-transformed.glb");