import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SimpleSkyProps {
  isRotating?: boolean;
  color?: string;
}

export function SimpleSky({ isRotating = false, color = "#87CEEB" }: SimpleSkyProps) {
  const skyRef = useRef<THREE.Mesh>(null);

  // Create a large sphere for the sky
  const geometry = new THREE.SphereGeometry(800, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    side: THREE.BackSide, // Render from inside
    fog: false
  });

  // Slow rotation animation
  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.02 * delta; // Very slow rotation
    }
  });

  return (
    <mesh 
      ref={skyRef} 
      geometry={geometry} 
      material={material}
      renderOrder={-1} // Render first (behind everything)
    />
  );
}