import { useGLTF } from "@react-three/drei";
import { GroupProps, useThree } from "@react-three/fiber";
import { forwardRef } from "react";
import { Euler, MathUtils } from "three/src/Three";

import CarpetGlb from "./Assets/Models/Carpet.glb";

/**
 * 
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */
const RapierWorldCarpet = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(CarpetGlb, true);

  const rotation = new Euler(MathUtils.degToRad(-90), 0, 90);

  return (
      <group {...props}
      ref={ref}
      castShadow
      receiveShadow
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
      rotation={rotation}
      >
        { Object.keys(nodes).map((key: string) => {
          return (
            <mesh
            key={key}
            geometry={nodes[key].geometry}
            material={nodes[key].material}
            castShadow
            receiveShadow
            />
          );
        })}
      </group>
  );
});

export { RapierWorldCarpet };