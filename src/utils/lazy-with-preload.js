import { lazy } from 'react';

export default (componentPromise) => {
  const Component = lazy(componentPromise);

  Component.preload = componentPromise;

  return Component;
};
