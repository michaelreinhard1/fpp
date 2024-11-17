import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Euler, MathUtils } from "three";

const PLANE_SIZE = 7;

const RapierWorldFloor = (props: any) => {

  const rotation = new Euler(MathUtils.degToRad(-90), 0, 0)

  return (
    <RigidBody type="fixed">
      <Plane args={[PLANE_SIZE, PLANE_SIZE, PLANE_SIZE]} rotation={rotation} receiveShadow={true}>
        <meshStandardMaterial color="white"/>
        {/* <meshStandardMaterial
          map={colorTexture}
          normalMap={normalTexture}
          roughnessMap={roughnessTexture}
        /> */}
      </Plane>
    </RigidBody>
  );
};

export { RapierWorldFloor };