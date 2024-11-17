import { animated, config, useSpring } from "@react-spring/three";
import { Box, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useState } from "react";
import { Euler, MathUtils } from "three";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import ChairGlb from "./Assets/Models/Chair.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const initialPosition = [0, 0, 0] 

const RapierWorldChair = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(ChairGlb, true);

  const [ {position}, setPosition] = useSpring(() => ({ position: initialPosition, config: config.wobbly}));

  const [{ rotation }, setRotation ] = useSpring(() => ({ rotation: [0, 0, 0], config: config.wobbly}));

  const [clicked, setClicked] = useState(false);
  
  const onClick = (e: any) => {

    setClicked(!clicked);

    if (clicked) {
      setPosition({ position: initialPosition, config: config.wobbly});
      setRotation({ rotation: [0, 0, 0], config: config.wobbly});
    } else {
      setPosition({ position: [1.5, -1.3, 0], config: config.wobbly});
      setRotation({ rotation: [0, 0, Math.PI/3], config: config.wobbly});
    }

  };

  return (
    <>
      <RigidBody
      type="fixed"
      position={clicked ? [-1.62, .42, -2.5] : [-1.62, 0.42, -1.7]}
      >
          <Box
            args={[1, 2.7, 1]}
          >
          <meshStandardMaterial transparent opacity={0} />
          </Box>
      </RigidBody>
          <group {...props}
            ref={ref}
            castShadow
            receiveShadow
            onClick={onClick}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            scale={[.35, .35, .35]}
            position={[-1.62, 0.42, -1.7]}
            rotation={new Euler(MathUtils.degToRad(-90), 0, 90)}
    
          >
            { Object.keys(nodes).map((key: string) => {
              return (
                // @ts-ignore
                <animated.mesh
                key={key}
                position={position}
                rotation={rotation}
                geometry={nodes[key].geometry}
                material={nodes[key].material}
                castShadow
                receiveShadow
                />
              );
            })}
          </group>
    </>

  );
});

export { RapierWorldChair };