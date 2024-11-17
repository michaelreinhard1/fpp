import { animated, useSpring } from "@react-spring/three";
import { Billboard, useGLTF } from "@react-three/drei";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useRef, useState } from "react";
import { Euler, MathUtils } from "three/src/Three";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import sound from "./Assets/Audio/PaperSlide.wav";
import CreditsBookGlb from "./Assets/Models/CreditsBook.glb";

/**
 *
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const audio = new Audio(sound);

audio.volume = .4;

const DISTANCE = 4;

const BOOK_POSITION = {
  x: -3.05,
  y: 1.03,
  z: .37,
};

const RapierWorldCreditsBook = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const args = [BOOK_POSITION.x,BOOK_POSITION.y,BOOK_POSITION.z] as [number, number, number]
  
  const { nodes }: any = useGLTF(CreditsBookGlb, true);

  const links = [
    {
      name: "Chess",
      url: "https://skfb.ly/6y8FI",
    },
    {
      name: "Keyboard",
      url: "https://skfb.ly/6Ypos",
    },
    {
      name: "Lamp",
      url: "https://skfb.ly/opxAW",
    },
    {
      name: "Ocean",
      url: "https://youtu.be/ieVPPZYvz7A",
    },
    {
      name: "Piano",
      url: "https://skfb.ly/oAMPt",
    },
    {
      name: "Plant",
      url: "https://skfb.ly/o6u8M",
    },
    {
      name: "Xulo",
      url: "https://www.instagram.com/xulobeats",
    },
    {
      name: "YouTube",
      url: "https://skfb.ly/6XZrr",
    },
    {
      name: "Freesound",
      url: "https://freesound.org",
    },
    {
      name: "Mixkit",
      url: "https://mixkit.co",
    },
    
  ];
  const [clicked, setClicked] = useState(false);

  const [{ scale }, set] = useSpring(() => ({ scale: 1, config: { tension: 120, friction: 14} }));

  // position
   const [{ position }, setPosition] = useSpring(() => ({ position: [0, 0, 0], config: { tension: 120, friction: 14} }));

   const [{ rotation }, setRotation] = useSpring(() => ({ rotation: [0, 0, 0], config: { tension: 120, friction: 14} }));
   
   const timer : any = useRef(null);

   const playerPosition = useThree((state) => state.camera.position);

   
   useFrame(({ camera }) => {
     const distance = Math.sqrt(
       Math.pow(playerPosition.x - args[0], 2) +
       Math.pow(playerPosition.y - args[1], 2) +
       Math.pow(playerPosition.z - args[2], 2)
     );
     
    if (distance > DISTANCE) {
      setRotation({ rotation: [0, 0, 0] });
      set({ scale: 1 });
      timer.current = setTimeout(() => {
        setPosition({ position: [0, 0, 0] });
      }, (250 * 1));
    }
    
  });
  let isFunctionDone = false;

const onClick = () => {
  if (isFunctionDone) {
    return;
  }

  isFunctionDone = true;

  const distance = Math.sqrt(
    Math.pow(playerPosition.x - args[0], 2) +
    Math.pow(playerPosition.y - args[1], 2) +
    Math.pow(playerPosition.z - args[2], 2)
  );


  if (distance < DISTANCE) {
    setClicked(!clicked);
  }
  if (!clicked) {
    audio.play();
    setPosition({ position: [0, 0, 1] });
    
   
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setRotation({ rotation: [MathUtils.degToRad(45), MathUtils.degToRad(10), MathUtils.degToRad(0)] });
      set({ scale: 3 });
    }, (250 * 1));
  } else {
    setRotation({ rotation: [0, 0, 0] });
    set({ scale: 1 });
   
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPosition({ position: [0, 0, 0] });
    }, (250 * 1));
  }

  isFunctionDone = false;
}

const onPointerOverHover = () => {
  const distance = Math.sqrt(
    Math.pow(playerPosition.x - args[0], 2) +
    Math.pow(playerPosition.y - args[1], 2) +
    Math.pow(playerPosition.z - args[2], 2)
  );

  if (distance < DISTANCE) {
    onPointerOver();
  }
};

const [linkClicked, setLinkClicked] = useState(false);

const openLink = (url: string) => {

  setLinkClicked(!linkClicked);

  if (!linkClicked) return;

  window.open(url, "_blank");

};


  
  return (
      <RigidBody
        type="fixed"
        scale={[.9, .9, .9]}
        position={[-3.05, 1.03, .37]}
        rotation={new Euler(MathUtils.degToRad(0), MathUtils.degToRad(90), 0)}
      >
        <group {...props}
          ref={ref}
          castShadow
          receiveShadow
          >
          {/* @ts-ignore */}
          <Billboard
            follow={!clicked}
            lockX={true}
            lockY={true}
            lockZ={true}
          >
          { Object.keys(nodes).map((key: string) => {
            // if (key.includes all the names from links
            // then return the animated mesh
            if (links.some((link) => key.includes(link.name)) ) {
                return (
                  // @ts-ignore
                  <animated.mesh
                  key={key}
                  geometry={nodes[key].geometry}
                  material={nodes[key].material}
                  castShadow
                  receiveShadow
                  position={position}
                  rotation={rotation}
                  scale={scale}
                  onPointerOver={onPointerOverHover}
                  onPointerOut={onPointerOut}
                  onClick={() => openLink(links.find((link) => key.includes(link.name))!.url)}
                  />
                );
              }else if (key.includes("Cross")){
                return (
                  // @ts-ignore
                  <animated.mesh
                  key={key}
                  geometry={nodes[key].geometry}
                  material={nodes[key].material}
                  castShadow
                  receiveShadow
                  position={position}
                  rotation={rotation}
                  scale={scale}
                  onClick={onClick}
                  onPointerOver={onPointerOverHover}
                  onPointerOut={onPointerOut}
                  />
                );
              }else if (key.includes("Paper") || key.includes("Text")){
                return (
                  // @ts-ignore
                  <animated.mesh
                  key={key}
                  geometry={nodes[key].geometry}
                  material={nodes[key].material}
                  castShadow
                  receiveShadow
                  position={position}
                  rotation={rotation}
                  scale={scale}
                  />
                );
              }
          })}
          </Billboard>
          <group
            onClick={onClick}
            onPointerOver={onPointerOverHover}
            onPointerOut={onPointerOut}
          >
          { Object.keys(nodes).map((key: string) => {
            // if (key.includes all the names from links
            // then return the animated mesh
            if (key.includes("Book") || key.includes("Cover") || key.includes("Credits")) {
                return (
                  <mesh
                  key={key}
                  geometry={nodes[key].geometry}
                  material={nodes[key].material}
                  castShadow
                  receiveShadow
                  />
                );
              }
          })}
          </group>
        </group>
      </RigidBody>
  );
});

export { RapierWorldCreditsBook };