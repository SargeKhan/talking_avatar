import { useTexture } from '@react-three/drei';

export default function Bg() {
  
  const texture = useTexture('/images/bg.webp');

  return(
    <mesh position={[0, 1.5, -2]} scale={[0.8, 0.8, 0.8]}>
      <planeBufferGeometry />
      <meshBasicMaterial map={texture} />

    </mesh>
  )

}