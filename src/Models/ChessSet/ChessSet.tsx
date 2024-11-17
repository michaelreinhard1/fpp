import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler, MathUtils } from "three/src/Three";

import ChessSetGlb from "./Assets/Models/ChessSet.glb";

/**
 * 
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */
const RapierWorldChessSet = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(ChessSetGlb, true);

  const rotation = new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(70))

  return (
    <group
    scale={[.06, .06, .06]}
    position={[0.55, .78, -3.1]}
    rotation={rotation}
    >
        { Object.keys(nodes).map((key: string) => {
          if (!key.includes("Board")) {
            return (
            <RigidBody type="dynamic" key={key}>
              <mesh
              key={key}
              name={nodes[key].name}
              geometry={nodes[key].geometry}
              material={nodes[key].material}
              position={nodes[key].position}
              castShadow
              receiveShadow
              />
              </RigidBody>
          )
        }
        })}
        <RigidBody type="dynamic">
        { Object.keys(nodes).map((key: string) => {
          if (key.includes("Board")) {
            return (
              <mesh
              key={key}
              name={nodes[key].name}
              geometry={nodes[key].geometry}
              material={nodes[key].material}
              position={nodes[key].position}
              castShadow
              receiveShadow
              />
          )
        }
        })}
        </RigidBody>
    </group>
  );
});

export { RapierWorldChessSet };