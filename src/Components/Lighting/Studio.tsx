import { useHelper } from "@react-three/drei";
import { folder, useControls } from "leva";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper } from "three";

import { LEVA } from "Configs/leva";
import { SettingsLeva as Settings } from "Settings/Leva";
import { SettingsLevaColor } from "Settings/Leva/Color";
import { SettingsLevaLighting } from "Settings/Leva/Lighting";
import { SettingsLevaPosition } from "Settings/Leva/Position";

const LightingStudio = (): JSX.Element => {
  const { helpers, helperSize } = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      helpers: SettingsLevaLighting.helpers(),
      helperSize: SettingsLevaLighting.helperSize(),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );
  const ambientLight = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      "Ambient Light": folder(
        {
          castShadow: SettingsLevaLighting.castShadow(true),
          color: SettingsLevaColor.color(SettingsLevaColor.values.Ambient),
          // color: SettingsLevaColor.color(SettingsLevaColor.values.Warm),
          intensity: SettingsLevaLighting.intensity(0.69),
        },
        Settings.folder()
      ),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );
  const frontLight = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      "Front Light": folder(
        {
          castShadow: SettingsLevaLighting.castShadow(true),
          color: SettingsLevaColor.color(SettingsLevaColor.values.Front),
          // color: SettingsLevaColor.color(),
          intensity: SettingsLevaLighting.intensity(0.84),
          position: SettingsLevaPosition.position(21, 2, 20),
        },
        Settings.folder()
      ),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );
  const leftLight = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      "Left Light": folder(
        {
          castShadow: SettingsLevaLighting.castShadow(true),
          color: SettingsLevaColor.color(SettingsLevaColor.values.Left),
          // color: SettingsLevaColor.color(SettingsLevaColor.values.Cold),
          intensity: SettingsLevaLighting.intensity(1),
          position: SettingsLevaPosition.position(0, 5, 0),
        },
        Settings.folder()
      ),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );
  const rightLight = useControls(
    LEVA.SCHEMA.LIGHTING,
    {
      "Right Light": folder(
        {
          castShadow: SettingsLevaLighting.castShadow(true),
          color: SettingsLevaColor.color(SettingsLevaColor.values.Right),
          // color: SettingsLevaColor.color(SettingsLevaColor.values.Cold),
          intensity: SettingsLevaLighting.intensity(),
          position: SettingsLevaPosition.position(4, 0, 0),
        },
        Settings.folder()
      ),
    },
    Settings.folder(LEVA.ORDER.LIGHTING)
  );

  const frontLightRef = useRef<DirectionalLight>(null);
  const leftLightRef = useRef<DirectionalLight>(null);
  const rightLightRef = useRef<DirectionalLight>(null);

  useHelper(
    helpers ? frontLightRef : null,
    DirectionalLightHelper,
    helperSize * frontLight.intensity,
    frontLight.color
  );
  useHelper(
    helpers ? leftLightRef : null,
    DirectionalLightHelper,
    helperSize * leftLight.intensity,
    leftLight.color
  );
  useHelper(
    helpers ? rightLightRef : null,
    DirectionalLightHelper,
    helperSize * rightLight.intensity,
    rightLight.color
  );

  return (
    <group name="Studio Lighting">
      <ambientLight
        color={ambientLight.color}
        intensity={ambientLight.intensity}
        name="Ambient Light"
        
      />
      <directionalLight
        castShadow={frontLight.castShadow}
        color={frontLight.color}
        intensity={frontLight.intensity}
        name="Front Light"
        position={SettingsLevaPosition.toArray(frontLight.position)}
        ref={frontLightRef}
        shadow-mapSize-width={3000}
        shadow-mapSize-height={3000}
        shadow-bias={-0.001}
        shadow-radius={2}
      />
      <directionalLight
        castShadow={leftLight.castShadow}
        color={leftLight.color}
        intensity={leftLight.intensity}
        name="Left Light"
        position={SettingsLevaPosition.toArray(leftLight.position)}
        ref={leftLightRef}
        shadow-mapSize-width={3000}
        shadow-mapSize-height={3000}
        shadow-bias={-0.001}
        shadow-radius={2}
      />
      <directionalLight
        castShadow={rightLight.castShadow}
        color={rightLight.color}
        intensity={rightLight.intensity}
        name="Right Light"
        position={SettingsLevaPosition.toArray(rightLight.position)}
        ref={rightLightRef}
        shadow-mapSize-width={3000}
        shadow-mapSize-height={3000}
        shadow-bias={-0.001}
        shadow-radius={2}
      />
    </group>
  );
};

export { LightingStudio as Studio };
