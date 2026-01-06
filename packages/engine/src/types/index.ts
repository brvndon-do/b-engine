import { Component, ComponentClass } from './Component';
import { Entity, BaseEntity } from './Entity';
import { System, BaseSystem } from './System';
import { Scene } from './Scene';

type ObjectIdentifier = string | number;

type AnchorOptions = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type ScreenContext = {
  width: number;
  height: number;
};

export type {
  ObjectIdentifier,
  AnchorOptions,
  ScreenContext,
  Entity,
  Component,
  ComponentClass,
  System,
  Scene,
};
export { BaseEntity, BaseSystem };
