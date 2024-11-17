import { MeshWobbleMaterial, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler, MathUtils } from "three";

import PlantGlb from "./Assets/Models/Plant.glb";

/**
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const RapierWorldPlant = forwardRef((props: GroupProps, ref: any): JSX.Element => {
  
  const { nodes, materials }: any = useGLTF(PlantGlb, true);

  const rotation = new Euler(MathUtils.degToRad(-90), 0, 0);

  return (
      <RigidBody
        type="fixed"
        scale={[.3, .3, .3]}
        position={[-2.6, 0, 2.8]}
        rotation={rotation}
      >
          <group
            {...props}
            ref={ref}
            castShadow
            receiveShadow
          >
            { Object.keys(nodes).map((key: string) => {
              if (!key.includes("Leaf")) {
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
            {/* Every other node that hasnt been rendered yet */}
            { Object.keys(nodes).map((key: string) => {
              if (key.includes("Leaf")) {
                return (
                <mesh
                key={key}
                geometry={nodes[key].geometry}
                castShadow
                receiveShadow
                material={nodes[key].material}
                >
                { Object.keys(materials).map((key: string) => {

                  if (key.includes("Leaf")) {

                  return (
                  <MeshWobbleMaterial
                      attach="material"
                      key={key}
                      factor={0.1}
                      color={'#5E9D70'}
                  >
                  </MeshWobbleMaterial>
                  );
                  }
                })}
                </mesh>
              );
              }
            })}
          </group>
      </RigidBody>
  );
});

export { RapierWorldPlant };