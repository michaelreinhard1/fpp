/// <reference types="react-scripts" />
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.tif";
declare module "*.wav";
declare module "*.mp3";
declare module "*.m4a";
declare module "*.gltf";

declare module JSX {
  interface IntrinsicElements {
      "group": any,
      "geometry": any,
      "lineBasicMaterial": any,
      "mesh": any,
      "octahedronGeometry": any,
      "meshBasicMaterial": any,
  }
}