import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

import { KEYBINDINGS } from "Configs/keybindings";
import { RapierWorldCrosshair } from "Examples/Rapier/World/Crosshair";
import { LayoutProps } from "Types/LayoutProps";

/**
 * Layout for a scene with Rapier physics engine for First Person view.
 *
 * @param {LayoutProps} props
 * @returns {JSX.Element}
 */

const Lighting = () => {
  return (
    <group name="Demo Lighting">
      <ambientLight
        color={'#7087a9'}
        intensity={.26}
        name="Ambient Light"
      />
      <directionalLight
        castShadow={true}
        color={"hsl(30, 100%, 70%)"}
        intensity={.4}
        name="Directional Light"
        position={[18.9, 4.2, 13]}
        // ref={directionalLightRef}
        shadow-mapSize-width={3000}
        shadow-mapSize-height={3000}
        shadow-bias={-0.001}
        shadow-radius={100}
      />
      <hemisphereLight
        // castShadow={true}
        color={"#ffe4ad"}
        groundColor={"hsl(30, 100%, 70%)"}
        intensity={.14}
        name="Hemisphere Light"
        position={[0, 1, 0]}
        // ref={hemisphereLightRef}
      />
      <pointLight
        castShadow={true}
        color={"#fffcd1"}
        intensity={.35}
        name="Point Light"
        position={[.7, 3.6, .3]}
        // ref={pointLightRef}
        shadow-mapSize-width={3000}
        shadow-mapSize-height={3000}
        shadow-bias={-0.001}
        shadow-radius={2}
      />
    </group>
  );
};

const SceneRapierFirstPersonLayout = ({
  children,
}: LayoutProps): JSX.Element => {

  return (
    <>
      <RapierWorldCrosshair />
      <Canvas
        shadows
      >
        <Suspense>
          <Lighting />
          <KeyboardControls map={KEYBINDINGS.QWERTY}>
            <Physics
              colliders={undefined}
              timeStep="vary"
              updatePriority={undefined}
            >
              {children}
            </Physics>
          </KeyboardControls>
        </Suspense>
      </Canvas>
    </>
  );
};

export { SceneRapierFirstPersonLayout };
