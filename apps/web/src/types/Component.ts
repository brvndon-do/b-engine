export interface Component {
  type: string;
}

export type ComponentClass<T extends Component> = new (...args: any[]) => T;
