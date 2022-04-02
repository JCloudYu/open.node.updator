/// <reference types="node" />
/**
 *	Author: JCloudYu
 *	Create: 2021/03/25
**/
import { EventEmitter } from "stream";
import Version = require("./version.js");
interface UpdateHandler {
    get_version(): Promise<string | null>;
    set_version(version: string): Promise<void>;
    handle_update(type: string, file_info: {
        path: string;
        name: string;
    }, prev_version: string | null): Promise<void>;
}
declare type InitOptions = {
    script_exts?: string[];
    update_handler: UpdateHandler;
    source_dir: string;
};
declare type _update_start_handler = {
    (event: 'update-begin', version: string): void;
};
declare type _update_end_handler = {
    (event: 'update-end', version: string): void;
};
declare type _update_script_handler = {
    (event: 'update-script', file_info: {
        path: string;
        name: string;
    }): void;
};
declare type _updating_handler = {
    (event: 'updating', version: string, prev_version: string | null): void;
};
declare type _updated_handler = {
    (event: 'updated', version: string, prev_version: string | null): void;
};
declare class Updator extends EventEmitter {
    static init(options: InitOptions): Updator;
    constructor();
    update(start_version?: string): Promise<void>;
    on(event: 'update-begin', handler: _update_start_handler): this;
    on(event: 'update-end', handler: _update_end_handler): this;
    on(event: 'update-script', handler: _update_script_handler): this;
    on(event: 'updating', handler: _updating_handler): this;
    on(event: 'updated', handler: _updated_handler): this;
}
export { Version, Updator, InitOptions, UpdateHandler };
