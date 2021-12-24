export declare function jsmin(params: jsminParams): Promise<void>;
export declare function jsminRaw(script: string): Promise<string>;
interface jsminParams {
    path: string;
    watch?: boolean;
}
export {};
