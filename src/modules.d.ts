declare module "*.scss" {
    const content: string;
    export default content;
}

declare module "*.svg" {
    const content: () => JSX.Element;
    export default content;
}