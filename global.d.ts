// global.d.ts or custom.d.ts
declare module '*.json' {
  const content: any;
  export default content;
}
