export declare function jsmin(params: jsminParams): Promise<void>;
export declare function jsminStr(script: string): Promise<string>;
interface jsminParams {
    path: string;
    watch?: boolean;
}
export {};
