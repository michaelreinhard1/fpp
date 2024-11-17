import { Sky, Stars } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

import { RapierWorld } from "Examples/Rapier/World";
import { SceneRapierFirstPersonLayout as Layout } from "Layouts/SceneRapierFirstPersonLayout";

/**
 * Page for Rapier World.
 *
 * @param {GroupProps} props
 * @returns {JSX.Element}
 */

const PhysicsRapierWorldPage = (props: GroupProps): JSX.Element => {
  
  return (
    <Layout>
      <RapierWorld {...props} />
      <Sky distance={20} sunPosition={[0.2, 0, 0.2]} inclination={100} azimuth={1} {...props} />
      <Stars radius={400} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </Layout>
  );
};

export { PhysicsRapierWorldPage };