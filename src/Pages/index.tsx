import { Navigate, Route, Routes, RoutesProps } from "react-router-dom";

import { NAVIGATION } from "Configs/navigation";
import { PhysicsRapierWorldPage } from "Pages/PhysicsRapierWorldPage";

/**
 * Router and pages.
 *
 * @param {RoutesProps} props
 * @returns {JSX.Element}
 */
const Pages = (props: RoutesProps): JSX.Element => {
  const allPath = "*";
  const homePath = NAVIGATION.PATH.PHYSICS_RAPIER_WORLD;
  const rootPath = "/";

  return (
    <Routes {...props}>
      <Route element={<Navigate to={rootPath} />} path={allPath} />
      <Route element={<Navigate to={homePath} />} path={rootPath} />
      <Route
        element={<PhysicsRapierWorldPage />}
        path={NAVIGATION.PATH.PHYSICS_RAPIER_WORLD}
      />
    </Routes>
  );
};

export { Pages };
