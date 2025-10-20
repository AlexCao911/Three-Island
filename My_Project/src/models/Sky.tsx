import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 类型定义
interface SkyProps {
  isRotating?: boolean;
}

interface GLTFResult {
  scene: THREE.Group;
}

// 3D Model: Fantasy Sky Background - Optimized version
export function Sky({ isRotating = false }: SkyProps) {
  const sky = useGLTF("/fantasy_sky_background-transformed.glb") as unknown as GLTFResult;
  const skyRef = useRef<THREE.Group>(null);

  // Frame animation - Let sky rotate slowly based on island rotation state
  // 'delta' represents time in seconds since last frame for smooth frame-rate independent animation
  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.1 * delta; // Slower rotation for sky
    }
  });

  // Configure sky materials for proper rendering
  if (sky.scene) {
    sky.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;
        material.side = THREE.BackSide; // Render from inside like a skybox
        material.depthWrite = false; // Don't interfere with other objects
      }
    });
  }

  return (
    <group 
      ref={skyRef}
      scale={[200, 200, 200]} // Very large scale to act as skybox
      position={[0, 0, 0]}
    >
      {/* Use primitive element to directly embed the complex 3D model */}
      <primitive object={sky.scene} />
    </group>
  );
}

// 预加载 GLTF 模型
useGLTF.preload("/fantasy_sky_background-transformed.glb");