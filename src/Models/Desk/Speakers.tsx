import { animated, useSpring } from "@react-spring/three";
import { Billboard, PositionalAudio, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useRef, useState } from "react";
import { Euler, MathUtils } from "three/src/Three";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import music from "./Assets/Audio/Beat.wav";
import MusicModalGlb from "./Assets/Models/MusicModal.glb";
import SpeakersGlb from "./Assets/Models/Speakers.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const audio = new Audio(music);

audio.volume = 0.5;
audio.currentTime = 23;

const RapierWorldMusicModal = forwardRef((props: any, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(MusicModalGlb, true);

  const rotation = new Euler(MathUtils.degToRad(0), MathUtils.degToRad(90), 0)

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

    window.open("https://youtu.be/VtNYfEWDmQE", "_blank");
  } 


  return (
    // @ts-ignore
      <Billboard
        scale={1}
        position={[-3.2, 2.45, -1.55]}
        follow={false}
        rotation={rotation}
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

const RapierWorldSpeakers = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(SpeakersGlb, true);

  const rotationRight = new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-35))
  const rotationLeft = new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(35))

  const [isPlaying, setIsPlaying] = useState(false);

  const [{ position }, set] = useSpring(() => ({ position: [0, 0, 0] }));

  const loop : any = useRef(null);

  const playAudio = () => {

    if (isPlaying) {
      setIsPlaying(false);
      clearInterval(loop.current);
      set({ position: [0, 0, 0]});

    } else {

      setIsPlaying(true);
      loop.current = setInterval(() => {
        set({ position: [Math.random() * .029, 0, 0]});
      }, 50);
    }
  };
  
  return (
    <>
      <RapierWorldMusicModal click={isPlaying} />
      <RigidBody
        type="fixed"
        name="Right Speaker"
        scale={[.8, .8, .8]}
        position={[-3.5, -.44, -1.5]}
        rotation={rotationRight}
      >
          <group {...props}
          ref={ref}
          castShadow
          onClick={playAudio}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          >
            <PositionalAudio
              ref={ref}
              url={music}
              distance={isPlaying ? 1 : 0}
              loop={true}
              autoplay
            />
            
            { Object.keys(nodes).map((key: string) => {

              if(nodes[key].name === "Woofer") {
                return (
                  // @ts-ignore
                  <animated.mesh
                  key={key}
                  geometry={nodes[key].geometry}
                  material={nodes[key].material}
                  castShadow
                  receiveShadow
                  position={position}
                  >
                  </animated.mesh>
                );
              } else {
              
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

              }
            })}
          </group>
      </RigidBody>
      <RigidBody
        type="fixed"
        name="Left Speaker"
        scale={[.8, .8, .8]}
        position={[-2.3, -.44, .1]}
        rotation={rotationLeft}
      >
          <group {...props}
          ref={ref}
          castShadow
          onClick={playAudio}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          >
            { Object.keys(nodes).map((key: string) => {

              if(nodes[key].name === "Woofer") {
                return (
                  // @ts-ignore
                  <animated.mesh
                  key={key}
                  geometry={nodes[key].geometry}
                  material={nodes[key].material}
                  castShadow
                  receiveShadow
                  position={position}
                  >
                  </animated.mesh>
                );
              } else {
              
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

              }
            })}
          </group>
      </RigidBody>
    </>
  );
});

export { RapierWorldSpeakers };