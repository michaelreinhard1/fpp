import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler, MathUtils } from "three";

import BinGlb from "./Assets/Models/Bin.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const RapierWorldBin = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(BinGlb, true);

  const rotation = new Euler(MathUtils.degToRad(-90), 0, 90)
  
  return (
      <RigidBody
        type="fixed"
        scale={[.2, .2, .2]}
        position={[-2.5, .22, -2.9]}
        rotation={rotation}
      >
          <group
            {...props}
            ref={ref}
            castShadow
            receiveShadow
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
      </RigidBody>
  );
});

export { RapierWorldBin };