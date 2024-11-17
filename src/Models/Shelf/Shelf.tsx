import { Billboard, Text, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useState } from "react";
import { Euler, MathUtils } from "three";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import ShelfGlb from "./Assets/Models/Shelf.glb";

/**
 * 
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const RapierWorldShelf = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(ShelfGlb, true);

  const rotation = new Euler(0, 0, 0)

  const [clicked, setClicked] = useState(false);

  const onClick = () => {

    setClicked(!clicked);

    if (clicked) return;

    window.open("https://www.youtube.com/@xulobeats", "_blank");
  };

  return (
    <RigidBody
      type="fixed"
      scale={[2.2, 2.2, 2.2]}
      position={[-3, 0, 1.25]}
      rotation={rotation}
    >
        { Object.keys(nodes).map((key: string) => {
          if (key.includes("YouTube")) {
            return (
              <mesh
              key={key}
              name={nodes[key].name}
              geometry={nodes[key].geometry}
              material={nodes[key].material}
              castShadow
              receiveShadow
              onClick={onClick}
              onPointerOver={onPointerOver}
              onPointerOut={onPointerOut}
              />
            )
          }else{
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
  );
});

export { RapierWorldShelf };