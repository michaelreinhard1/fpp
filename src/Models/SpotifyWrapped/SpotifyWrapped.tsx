import { animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { GroupProps, useThree } from "@react-three/fiber";
import { forwardRef, useRef, useState } from "react";
import { Vector3 } from "three";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import SpotifyWrappedGlb from "./Assets/Models/SpotifyWrapped.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const RapierWorldSpotifyWrapped = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(SpotifyWrappedGlb, true);
  
  const group = useRef();

  const [clicked, setClicked] = useState(false);

  const spotifyHref = () => {

    setClicked(!clicked);

    if (clicked) return;

    window.open("https://open.spotify.com/artist/3wgcAo8qtU3xunCQX945Uj", "_blank");
  };

  return (
    // @ts-ignore
          <group {...props}
          name="SpotifyWrapped"
          onClick={spotifyHref}
          ref={group}
          castShadow
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          rotation={[Math.PI, 0, 0]}
          position={[-1, 2.7, -3.33]}
          >
            { Object.keys(nodes).map((key: string) => {
              return (
                // @ts-ignore
                <animated.mesh
                key={key}
                scale={0.01}
                geometry={nodes[key].geometry}
                material={nodes[key].material}
                castShadow
                />
              );
            })}
          </group>
  );
});

export { RapierWorldSpotifyWrapped };