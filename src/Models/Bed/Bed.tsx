import { Box, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler, MathUtils } from "three";

import { RapierWorldChessSet as ChessSet } from "../ChessSet/ChessSet";
import { RapierWorldLamp as Lamp } from "../Lamp/Lamp";
import BedGlb from "./Assets/Models/Bed.glb";

/**
 * 
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const RapierWorldNightTable = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const rotation = new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-90))

  return (
    <>
    <Lamp />
    <ChessSet />
    <RigidBody
      type="fixed"
      scale={[.24, .24, .24]}
      position={[1, .69, -3.1]}
      rotation={rotation}
    >
      <Box
        args={[2.61, 4.48, 0.5]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial  color={"#ce9c72"}/>
      </Box>
      
    </RigidBody>
    </>
  );
});

const RapierWorldBed = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(BedGlb, true);

  const rotation = new Euler(0, MathUtils.degToRad(-90), 0)

  return (
    <>
    <RapierWorldNightTable />
    
    <RigidBody
      type="fixed"
      scale={[1.4, 1.4, 1.4]}
      position={[2.5, 0, -2.05]}
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
    </RigidBody>
    </>
  );
});

export { RapierWorldBed };