import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DebugSkyProps {
  isRotating?: boolean;
}

export function DebugSky({ isRotating = false }: DebugSkyProps) {
  const gltf = useGLTF("/fantasy_sky_background-transformed.glb");
  const skyRef = useRef<THREE.Group>(null);

  // Debug: Log the loaded GLTF structure
  useEffect(() => {
    console.log("🌌 Fantasy Sky GLTF loaded:", gltf);
    console.log("📦 Scene:", gltf.scene);
    console.log("🎨 Materials:", gltf.materials);
    console.log("🔗 Nodes:", gltf.nodes);
    
    // Log all children in the scene
    if (gltf.scene) {
      console.log("👶 Scene children:");
      gltf.scene.traverse((child, index) => {
        console.log(`  ${index}: ${child.name} (${child.type})`, child);
        if (child instanceof THREE.Mesh) {
          console.log(`    📐 Geometry:`, child.geometry);
          console.log(`    🎨 Material:`, child.material);
        }
      });
    }
  }, [gltf]);

  // Configure materials for proper sky rendering
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          
          // Configure for skybox
          material.side = THREE.BackSide;
          material.depthWrite = false;
          material.depthTest = false;
          
          console.log(`🔧 Configured material for: ${child.name}`, material);
        }
      });
    }
  }, [gltf.scene]);

  // Rotation animation
  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.1 * delta;
    }
  });

  return (
    <group 
      ref={skyRef}
      position={[0, 0, 0]}
      scale={[30, 30, 30]} // Moderate scale for testing
      renderOrder={-1000}
    >
      <primitive object={gltf.scene} />
      
      {/* Debug: Add a wireframe to see the geometry */}
      {gltf.scene && (
        <primitive 
          object={gltf.scene.clone()} 
          material={new THREE.MeshBasicMaterial({ 
            color: 0xff0000, 
            wireframe: true, 
            opacity: 0.1, 
            transparent: true 
          })} 
        />
      )}
    </group>
  );
}

// Preload the model
useGLTF.preload("/fantasy_sky_background-transformed.glb");