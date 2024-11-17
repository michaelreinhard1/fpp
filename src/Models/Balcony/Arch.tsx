import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { forwardRef } from "react";
import { Euler, MathUtils } from "three/src/Three";

import ArchGlb from "./Assets/Models/Arch.glb";

/**
 * 
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */
const RapierWorldArch = forwardRef((props: GroupProps, ref: any): JSX.Element => {
  const { nodes }: any = useGLTF(ArchGlb, true);

  const rotation = new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(90))

  return (
      <group
      name="Arch"
      scale={[1.9, 1.5, 1.375]}
      position={[3.5, 1.835, 1.75]}
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
            >
              {/* nice white Arch color, not pure white */}
              <meshStandardMaterial color={'white'}/>
            </mesh>
          );
        })}
      </group>
  );
});

export { RapierWorldArch };
