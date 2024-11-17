import { Box, Plane, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler, MathUtils } from "three/src/Three";

import { RapierWorldArch as Arch } from "./Arch";
import BalconyGlb from "./Assets/Models/Balcony.glb";

/**
 * 
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */
const RapierWorldBalcony = forwardRef((props: GroupProps, ref: any): JSX.Element => {
  const { nodes }: any = useGLTF(BalconyGlb, true);

  const rotation = new Euler(MathUtils.degToRad(-90), 0, MathUtils.degToRad(90))

  return (
    <>
    <Arch />
    {/* invisble walls */}
    <RigidBody type="fixed">
          <Box
            args={[3, 5, 1]}
            position={[5, 2, -0.58]}
          >
            <meshBasicMaterial opacity={0} transparent/>
          </Box>
          <Box
            args={[3, 5, 1]}
            position={[5, 2, 4.1]}
          >
            <meshBasicMaterial opacity={0} transparent/>
          </Box>
          <Box
            args={[1, 5, 5]}
            position={[6.3, 2, 1.5]}
          >
            <meshBasicMaterial opacity={0} transparent/>
          </Box>
    </RigidBody>

      {/* balcony floor */}

      <RigidBody
        position={[4.75, 0, 1.75]}
        name="Balcony Floor"
      >
        <Plane args={[3.8, 2.5, 4]} rotation={rotation} receiveShadow>
          <meshStandardMaterial color={'white'}/>
          {/* <meshStandardMaterial
            map={colorTexture}
            normalMap={normalTexture}
            roughnessMap={roughnessTexture}
          /> */}
        </Plane>
      </RigidBody>
      <group
      name="Balcony"
      scale={[1.2, 1.2, 1.2]}
      position={[4.3, -.23, 1.8]}
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
              {/* nice white balcony color, not pure white */}
              <meshStandardMaterial color={0x9e9e9e}/>
            </mesh>
          );
        })}
      </group>
    </>
  );
});

export { RapierWorldBalcony };