import { useGLTF } from "@react-three/drei";
import { GroupProps, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler, MathUtils } from "three/src/Three";

import ComputerGlb from "./Assets/Models/Computer.glb";
import DeskGlb from "./Assets/Models/Desk.glb";
import KeyboardGlb from "./Assets/Models/Keyboard.glb";
import MouseGlb from "./Assets/Models/Mouse.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const RapierWorldMouse = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(MouseGlb, true);

  const rotation = new Euler(0, 0, MathUtils.degToRad(180))

  return (
      <RigidBody
        type="fixed"
        scale={[.08, .08, .08]}
        position={[.25, 1, 2.34]}
        rotation={rotation}
      >
          <group {...props}
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
                >
                </mesh>
              );
            })}
          </group>
      </RigidBody>
  );
});
const RapierWorldKeyboard = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(KeyboardGlb, true);

  const rotation = new Euler(0, 0, MathUtils.degToRad(90))

  return (
      <RigidBody
        type="fixed"
        scale={[1, 1, 1]}
        position={[.3, -.15, 2.34]}
        rotation={rotation}
      >
          <group {...props}
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
                >
                </mesh>
              );
            })}
          </group>
      </RigidBody>
  );
});

const RapierWorldComputer = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(ComputerGlb, true);

  const rotation = new Euler(0, 0, MathUtils.degToRad(90))

  return (
      <RigidBody
        type="fixed"
        scale={[1.6, 1.6, 1.6]}
        position={[-.3, -1, 0]}
        rotation={rotation}
      >
          <group {...props}
          ref={ref}
          castShadow
          >
            { Object.keys(nodes).map((key: string) => {
              return (
                <mesh
                key={key}
                geometry={nodes[key].geometry}
                material={nodes[key].material}
                castShadow
                receiveShadow
                >
                </mesh>
              );
            })}
          </group>
      </RigidBody>
  );
});

const RapierWorldDesk = forwardRef((props: GroupProps, ref: any): JSX.Element => {
  
  const { nodes }: any = useGLTF(DeskGlb, true);

  return (
      <RigidBody
        type="fixed"
        scale={[.6, .6, .6]}
        position={[-2.6, 0, -1.5]}
        rotation={[-Math.PI/2, 0, 0]}
      >
        <RapierWorldMouse />
        <RapierWorldKeyboard />
        <RapierWorldComputer />
          <group {...props}
          ref={ref}
          castShadow
          >
            { Object.keys(nodes).map((key: string) => {
              return (
                <mesh
                key={key}
                geometry={nodes[key].geometry}
                material={nodes[key].material}
                castShadow
                receiveShadow
                >
                </mesh>
              );
            })}
          </group>
      </RigidBody>
  );
});

export { RapierWorldDesk };