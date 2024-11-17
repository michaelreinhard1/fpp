import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";

import { App } from "App";

const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Suspense>
      <App />
    </Suspense>
    <Loader />
  </StrictMode>
);
