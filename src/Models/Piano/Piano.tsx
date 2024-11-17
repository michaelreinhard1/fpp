import { animated, useSpring } from "@react-spring/three";
import { Billboard, PositionalAudio, useGLTF } from '@react-three/drei'
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useRef, useState } from "react";
import { Euler, MathUtils } from "three";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import music from "./Assets/Audio/Animus.wav";
import MusicModalPiano from "./Assets/Models/MusicModalPiano.glb";
import PianoGlb from "./Assets/Models/Piano.glb";
import PianoChairGlb from "./Assets/Models/PianoChair.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const audio = new Audio(music);

audio.volume = 0.2;
audio.currentTime = 23;

const RapierWorldMusicModalPiano = forwardRef((props: any, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(MusicModalPiano, true);

  const rotation = new Euler(MathUtils.degToRad(0), MathUtils.degToRad(180), 0)

  const [{ scale }, set] = useSpring(() => ({ scale: 0 }));

  if (props.click) {
    set({ scale: 1 });
  } else {
    set({ scale: 0 });
  }
  
  const [clicked, setClicked] = useState(false);

  const onClick = () => {

    setClicked(!clicked);

    if (clicked) return;

    window.open("https://open.spotify.com/track/305CEqNvERmR83z8ih6xSz?si=19784afbbac3414a", "_blank");
  } 

  return (
    // @ts-ignore
      <Billboard
        scale={1}
        position={[0, 1.6, 3.1]}
        rotation={rotation}
        follow={false}
      >

          <group {...props}
          ref={ref}
          castShadow
          onClick={onClick}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          >
            { Object.keys(nodes).map((key: string) => {
              return (
              // @ts-ignore
              <animated.mesh
              key={key}
              geometry={nodes[key].geometry}
              material={nodes[key].material}
              castShadow
              receiveShadow
              scale={scale}
              />
              );
            })}
          </group>
      </Billboard>
  );
});

const RapierWorldPianoChair = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(PianoChairGlb, true);

  return (
      <RigidBody
        type="fixed"
        scale={[1.7, 1.7, 1.7]}
        position={[0, 0, 2.2]}
        rotation={[0, 0, 0]}
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
              />
              );
            })}
          </group>
      </RigidBody>
  );
});


const RapierWorldPiano = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(PianoGlb, true);
  
  const [isPlaying, setIsPlaying] = useState(false);

  const timer : any = useRef(null);

  const playAudio = () => {
    setIsPlaying(!isPlaying);
  };


  return (
    <>
      <RapierWorldPianoChair />
      <RapierWorldMusicModalPiano click={isPlaying} />
      <RigidBody
        type="fixed"
        scale={[1.65, 1.65, 1.65]}
        position={[0, 0.85, 3]}
        rotation={[-Math.PI/2, 0, -Math.PI/2]}
      >

            <PositionalAudio
              ref={ref}
              url={music}
              distance={isPlaying ? .8 : 0}
              loop={true}
              autoplay
            />
          
          <group {...props}
          ref={ref}
          onClick={playAudio}
          castShadow
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}

          >
            { Object.keys(nodes).map((key: string) => {
              return (
                <mesh
                key={key}
                geometry={nodes[key].geometry}
                material={nodes[key].material}
                castShadow
                />
              );
            })}
          </group>
      </RigidBody>
    </>
  );
});

export { RapierWorldPiano };