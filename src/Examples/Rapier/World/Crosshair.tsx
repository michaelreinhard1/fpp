import { extend } from '@react-three/fiber'
import { OrbitControls, TransformControls } from 'three-stdlib'

extend({ OrbitControls, TransformControls })

const RapierWorldCrosshair = () => {

  return (
    <div id='crosshair' className='crosshair'/>
  );
};

export { RapierWorldCrosshair };