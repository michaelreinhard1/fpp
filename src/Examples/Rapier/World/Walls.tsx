import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { MathUtils } from "three";

const WALL_HEIGHT = 5;
const WALL_WIDTH = 7;
const WALL_THICKNESS = .3;
const WALL_START = 2.5;

const RapierWorldWalls = (props: any) => {

  return (
      <RigidBody type="fixed" >
          <Box
            args={[WALL_WIDTH, WALL_HEIGHT, WALL_THICKNESS]}
            position={[0, WALL_START, -3.5]}
            receiveShadow
            castShadow
          >
          <meshStandardMaterial  color={"white"}/>
          </Box>
          <Box
            args={[WALL_WIDTH, WALL_HEIGHT, WALL_THICKNESS]}
            position={[0, WALL_START, 3.5]}
            receiveShadow
            castShadow
          >
          <meshStandardMaterial  color={"white"}/>
          </Box>
          <Box
            args={[WALL_WIDTH, WALL_HEIGHT, WALL_THICKNESS]}
            position={[-3.5, WALL_START, 0]}
            rotation={[0, MathUtils.degToRad(90), 0]}
            receiveShadow
            castShadow
          >
          <meshStandardMaterial  color={"white"}/>
          </Box>
          <Box
            args={[4, WALL_HEIGHT, WALL_THICKNESS]}
            position={[3.5, WALL_START, -4]}
            rotation={[0, MathUtils.degToRad(90), 0]}
            receiveShadow
            castShadow
          >
          <meshStandardMaterial  color={"white"}/>
          </Box>
      </RigidBody>
  );
};

export { RapierWorldWalls };