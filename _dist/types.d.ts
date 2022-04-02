import Version = require("./version.js");
export declare type PatchItem = {
    path: string;
    name: string;
    version: Version;
    type: string;
    order: number;
};
