import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { forwardRef, useState } from "react";
import { Euler, MathUtils } from "three/src/Three";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import MonitorGlb from "./Assets/Models/Monitor.glb";

/**
 * 
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */
const RapierWorldMonitor = forwardRef((props: GroupProps, ref: any): JSX.Element => {
  const { nodes }: any = useGLTF(MonitorGlb, true);

  const rotation = new Euler(MathUtils.degToRad(-90), 0, 0)

  const [clicked, setClicked] = useState(false);

  const onClick = () => {

    setClicked(!clicked);

    if (clicked) return;

    window.open("https://www.michaelreinhard.be", "_blank");
  }


  return (
      <group {...props}
      ref={ref}
      castShadow
      receiveShadow
      scale={[.7, .7, .7]}
      position={[-2.60, -.23, -1.55]}
      rotation={rotation}
      onClick={onClick}
      onPointerOut={onPointerOut}
      onPointerOver={onPointerOver}
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
  );
});

export { RapierWorldMonitor };