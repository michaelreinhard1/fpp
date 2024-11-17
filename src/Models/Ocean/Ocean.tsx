import { MeshWobbleMaterial, Plane, PositionalAudio, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";

import music from './Assets/Audio/Ocean.m4a'
import OceanGlb from "./Assets/Models/Ocean.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const RapierWorldOcean = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(OceanGlb, true);

  return (
    <>
    {/* Ocean Soundscape */}
    <group position={[20, -5, 1.6]}> 
      <PositionalAudio
        ref={ref}
        url={music}
        distance={5}
        loop
        autoplay
      />
    </group> 

    {/* Fixed floor */}
    <RigidBody
      type="fixed"
      position={[0, -20, 0]}
      rotation={[-Math.PI/2, 0, 0]}
    >
      <Plane args={[20, 20, 20]}>
        <meshStandardMaterial color="white"/>
      </Plane>
    </RigidBody>
      <RigidBody
      scale={[1000, 1000, 150]}
      position={[0, -10, 0]}
      rotation={[-Math.PI/2, 0, 0]}
      >
        <group {...props}
        >
          { Object.keys(nodes).map((key: string) => {
            return (
              <mesh
              key={key}
              geometry={nodes[key].geometry}
              material={nodes[key].material}
              animation={nodes[key].animation}
              >
                <MeshWobbleMaterial attach="material" color={0x005477} speed={4} factor={.07} />
              </mesh>
            );
          })}
        </group>
      </RigidBody>
  </>
  );
});

export { RapierWorldOcean };