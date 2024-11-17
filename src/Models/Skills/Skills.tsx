import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { forwardRef, useState } from "react";
import { Euler, MathUtils } from "three";

import { onPointerOut, onPointerOver } from "../../Utils/Crosshair/Events";
import SkillsGlb from "./Assets/Models/Skills.glb";

/**
 * 
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */


const RapierWorldSkills = forwardRef((props: GroupProps, ref: any): JSX.Element => {

  const { nodes }: any = useGLTF(SkillsGlb, true);

  const rotation = new Euler(MathUtils.degToRad(-90), MathUtils.degToRad(0), MathUtils.degToRad(-180))

  const links = [
    {
      name: "React",
      url: "https://reactjs.org/",
    },
    {
      name: "Laravel",
      url: "https://laravel.com/",
    },
    {
      name: "ThreeJS",
      url: "https://threejs.org/",
    },
    {
      name: "Drei",
      url: "",
    },
    {
      name: "Rapier",
      url: "https://rapier.rs/",
    },
    {
      name: "MySQL",
      url: "https://www.mysql.com/",
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
    },
    {
      name: "PHP",
      url: "https://www.php.net/",
    },
    {
      name: "JavaScript",
      url: "https://www.javascript.com/",
    },
    {
      name: "HTML",
      url: "https://html.com/",
    },
    {
      name: "CSS",
      url: "https://www.w3.org/Style/CSS/Overview.en.html",
    },
    {
      name: "Tailwind",
      url: "https://tailwindcss.com/",
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
        scale={[.09, .09, .09]}
        position={[0, 1.8, 3.3]}
        rotation={rotation}
      >
          { Object.keys(nodes).map((key: string) => {
            if (key.includes("Text")) {
              return (
                <mesh
                key={key}
                geometry={nodes[key].geometry}
                material={nodes[key].material}
                castShadow
                receiveShadow
                scale={[3, 3, 3]}
                />
              );
            } else{

              return (
                <mesh
                key={key}
                geometry={nodes[key].geometry}
                material={nodes[key].material}
                castShadow
                receiveShadow
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
                onClick={onClick.bind(this, links.find((link) => key.includes(link.name))?.url)}
                />
              );
            }
          })}
      </group>
  );
});

export { RapierWorldSkills };