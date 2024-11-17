import { animated, config, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { GroupProps, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useState } from "react";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import lampOffSound from "./Assets/Audio/LampOff.wav";
import lampOnSound from "./Assets/Audio/LampOn.wav";
import LampGlb from "./Assets/Models/Lamp.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const position = {
  x: 1.25,
  y: 1.1,
  z: -3.1,
};

const SOUND_VOLUME = 0.3;

const RapierWorldLamp = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const args = [position.x,position.y,position.z] as [number, number, number]

  const { nodes }: any = useGLTF(LampGlb, true);

  const [lampOn, setLampOn] = useState(false);
  
  const [intensity, setIntensity] = useState(0);

  const sounds = {
    lampOn: new Audio(lampOnSound),
    lampOff: new Audio(lampOffSound),
  };

  sounds.lampOn.volume = SOUND_VOLUME;
  sounds.lampOff.volume = SOUND_VOLUME;

  const turnOn = () => {

      setLampOn(!lampOn);
      setIntensity(lampOn ? 0 : .6);
      lampOn ? sounds.lampOff.play() : sounds.lampOn.play();
  };
  
  return (
      <RigidBody
        type="fixed"
        position={args}
        rotation={[Math.PI/2, Math.PI, 0]}
      >
          <group
          name="Lamp"
          ref={ref}
          castShadow
          receiveShadow
          onClick={turnOn}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          >
            <pointLight
              position={[0,0,0]}
              intensity={intensity}
              color={"#f0b852"}
              castShadow
              distance={10}
              decay={2}
              shadow-mapSize-width={3000}
              shadow-mapSize-height={3000}
              shadow-bias={-0.001}
              shadow-radius={2}
            />

            { Object.keys(nodes).map((key: string) => {
              return (
                // @ts-ignore
                <animated.mesh
                scale={0.16}
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

export { RapierWorldLamp };