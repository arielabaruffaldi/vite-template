/// <reference types="vite/client" />

declare interface Window {
    __ENV: Record<string, string>
}

declare module '*.scss' {
    const content: Record<string, string>
    export default content
}

declare module '*.jp2'
declare module '*.webp'
declare module '*.png'
