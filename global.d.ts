export {};

declare global {
  interface Items {
    title: string,
    active: boolean,
    selected: boolean,
    path: string,
    icon: JSX.Element,
  }
}
