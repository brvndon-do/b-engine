import { Component } from '../types';

export const isComponentNull = (...components: (Component | undefined)[]) =>
  components.some((x) => x == null);
