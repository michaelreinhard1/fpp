import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler, MathUtils } from "three";

import CeilingWindowGlb from "./Assets/Models/CeilingWindow.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const RapierWorldCeilingWindow = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(CeilingWindowGlb, true);

  const rotation = new Euler(0, MathUtils.degToRad(-90), 0)
  
  return (
      <RigidBody
        type="fixed"
        scale={[.4, .4, .4]}
        position={[-.5, 4.95, 0]}
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

export { RapierWorldCeilingWindow };