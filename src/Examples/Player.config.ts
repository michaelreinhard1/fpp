import { Vector3 } from "three";

export const PLAYER = Object.freeze({
  MASS: 75, // kg
  POSITION: new Vector3(0, 1, 2),
  SIZE: .7, // radius in m
  JUMP_FORCE: 10, // N
  VELOCITY: {
    FORWARD_DIRECTION: 3,
    RIGHT_DIRECTION: 3,
    UP_DIRECTION: 3,
  },
});