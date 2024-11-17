import { useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper, HemisphereLight, HemisphereLightHelper, MathUtils, Object3D, PointLight, PointLightHelper, SpotLight, SpotLightHelper } from "three";

import { LEVA } from "Configs/leva";
import { SettingsLeva as Settings } from "Settings/Leva";
import { SettingsLevaColor as LevaColor } from "Settings/Leva/Color";
import { SettingsLevaLighting as LevaLighting } from "Settings/Leva/Lighting";
import { SettingsLevaPosition as LevaPosition } from "Settings/Leva/Position";

const intensityMax = 20;

const LightingDemo = (): JSX.Element => {
  const { helpers, helperSize } = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      helpers: LevaLighting.helpers(),
      helperSize: LevaLighting.helperSize(),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );
  const ambientLight = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      "Ambient Light": folder(
        {
          color: LevaColor.color("#7087a9"),
          intensity: LevaLighting.intensity(.26, 1),
        },
        Settings.folder()
      ),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );
  const directionalLight = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      "Directional Light": folder(
        {
          castShadow: LevaLighting.castShadow(true),
          color: LevaColor.color("hsl(30, 100%, 70%)"),
          intensity: LevaLighting.intensity(.4, 1),
          position: LevaPosition.position(18.9, 4.2, 13),
        },
        Settings.folder()
      ),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );
  const hemisphereLight = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      "Hemisphere Light": folder(
        {
          castShadow: LevaLighting.castShadow(true),
          color: LevaColor.color("#ffe4ad", "Sky"),
          groundColor: LevaColor.color("hsl(30, 100%, 70%)", "Ground"),
          intensity: LevaLighting.intensity(.14, 1),
          position: LevaPosition.position(0, 1, 0),
        },
        Settings.folder()
      ),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );
  const pointLight = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      "Point Light": folder(
        {
          castShadow: LevaLighting.castShadow(true),
          color: LevaColor.color("#fffcd1"),
          intensity: LevaLighting.intensity(.35, 20),
          position: LevaPosition.position(.7, 3.6, .3),
        },
        Settings.folder()
      ),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );
  const spotLight = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      Spotlight: folder(
        {
          castShadow: LevaLighting.castShadow(true),
          color: LevaColor.color("hsl(60, 100%, 70%)"),
          distance: LevaLighting.distance(),
          intensity: LevaLighting.intensity(0, 20),
          penumbra: LevaLighting.penumbra(1),
          position: LevaPosition.position(5, 2, 2),
          target: LevaLighting.target(),
        },
        Settings.folder()
      ),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );

  const { scene } = useThree();
  const target = new Object3D();
  scene.add(target);

  const directionalLightRef = useRef<DirectionalLight>(null);
  const hemisphereLightRef = useRef<HemisphereLight>(null);
  const pointLightRef = useRef<PointLight>(null);
  const spotLightRef = useRef<SpotLight>(null);

  useHelper(
    helpers ? directionalLightRef : null,
    DirectionalLightHelper,
    helperSize * directionalLight.intensity,
    directionalLight.color
  );

  useHelper(
    helpers ? pointLightRef : null,
    PointLightHelper,
    helperSize * (pointLight.intensity / intensityMax),
    pointLight.color
  );
  useHelper(helpers ? spotLightRef : null, SpotLightHelper, spotLight.color);
  useHelper(
    helpers ? hemisphereLightRef : null,
    HemisphereLightHelper,
    helperSize * hemisphereLight.intensity
  );

  useFrame(() => {
    target.translateX(spotLight.target.x);
    target.translateZ(spotLight.target.z);
  });

  return (
    <group name="Demo Lighting">
      <ambientLight
        color={ambientLight.color}
        intensity={ambientLight.intensity}
        name="Ambient Light"
        
      />
      <directionalLight
        castShadow={directionalLight.castShadow}
        color={directionalLight.color}
        intensity={directionalLight.intensity}
        name="Directional Light"
        position={LevaPosition.toArray(directionalLight.position)}
        ref={directionalLightRef}
        shadow-mapSize-width={3000}
        shadow-mapSize-height={3000}
        shadow-bias={-0.001}
        shadow-radius={100}
      />
      <hemisphereLight
        // castShadow={hemisphereLight.castShadow}
        color={hemisphereLight.color}
        groundColor={hemisphereLight.groundColor}
        intensity={hemisphereLight.intensity}
        name="Hemisphere Light"
        position={LevaPosition.toArray(hemisphereLight.position)}
        ref={hemisphereLightRef}


      />
      <pointLight
        castShadow={pointLight.castShadow}
        color={pointLight.color}
        intensity={pointLight.intensity}
        name="Point Light"
        position={LevaPosition.toArray(pointLight.position)}
        ref={pointLightRef}
        shadow-mapSize-width={3000}
        shadow-mapSize-height={3000}
        shadow-bias={-0.001}
        shadow-radius={2}
      />
      <spotLight
        angle={MathUtils.degToRad(30)}
        castShadow={spotLight.castShadow}
        color={spotLight.color}
        intensity={spotLight.intensity}
        name="Spotlight"
        penumbra={spotLight.penumbra}
        position={LevaPosition.toArray(spotLight.position)}
        ref={spotLightRef}
        target={target}
      />
    </group>
  );
};

export { LightingDemo as Demo };
