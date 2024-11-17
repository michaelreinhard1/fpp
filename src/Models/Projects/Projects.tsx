import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { forwardRef, useState } from "react";
import { Euler, MathUtils } from "three";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import ProjectsGlb from "./Assets/Models/Projects.glb";

/**
 * 
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */


const RapierWorldProjects = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(ProjectsGlb, true);

  const rotation = new Euler(0, MathUtils.degToRad(-90), 0)

  const links = [
    {
      name: "Gestured",
      url: "https://gestured.vercel.app",
    },
    {
      name: "Intera",
      url: "https://github.com/michaelreinhard1/intera",
    },
    {
      name: "Sleepybaby",
      url: "https://github.com/michaelreinhard1/sleepybaby",
    },
    
  ];

  const [clicked, setClicked] = useState(false);

  const onClick = (link: any) => {
    
    setClicked(!clicked);

    if (clicked) return;

    window.open(link, "_blank");

  };

  return (
      <group
        scale={[.3, .3, .3]}
        position={[3.33, .85, -1.5]}
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
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
                scale={[1, 1, 1]}
                // if the name of the node includes the name of the link, then add a link to the node
                onClick={onClick.bind(this, links.find((link) => key.includes(link.name))?.url)}
                />
              );
          })}
      </group>
  );
});

export { RapierWorldProjects };