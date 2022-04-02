/**
 *	Author: JCloudYu
 *	Create: 2021/03/25
**/
import {EventEmitter} from "stream";
import type {PatchItem} from "./types.js";
import fsp = require("fs/promises");
import Version = require("./version.js");
import path = require('path');


interface UpdateHandler {
	get_version():Promise<string|null>;
	set_version(version:string):Promise<void>;
	handle_update(type:string, file_info:{path:string; name:string;}, prev_version:string|null):Promise<void>;
}

type InitOptions = {
	script_exts?:string[];
	update_handler:UpdateHandler;
	source_dir:string;
}


const DEFAULT_SCRIPT_EXTS:string[] = [ 'sql', 'js' ];
const __Updator:WeakMap<Updator, {
	handler:UpdateHandler;
	source_dir:string;
	script_exts:string[];
}> = new WeakMap();



type _general_event_handler = {(event:string, ...args:any[]):void};
type _update_start_handler = {(event:'update-begin', version:string):void};
type _update_end_handler = {(event:'update-end', version:string):void};
type _update_script_handler = {(event:'update-script', file_info:{path:string;name:string;}):void};
type _updating_handler = {(event:'updating', version:string, prev_version:string|null):void};
type _updated_handler = {(event:'updated', version:string, prev_version:string|null):void};
type update_handlers = _general_event_handler|_update_start_handler|_update_end_handler|_update_script_handler|_updating_handler|_updated_handler;



class Updator extends EventEmitter {
	static init(options:InitOptions):Updator {
		const updator = new Updator();
		const update_handler = options.update_handler;
		if ( Object(update_handler) !== update_handler ) {
			throw new TypeError("Option 'update_handler' is invalid!");
		}
		
		if ( typeof update_handler.get_version !== "function" || 
			 typeof update_handler.set_version !== "function" ||
			 typeof update_handler.handle_update !== "function" ) {
				throw new TypeError("Option 'update_handler' is invalid!");
		}
		
		const script_exts = options.script_exts||DEFAULT_SCRIPT_EXTS;
		if ( !Array.isArray(script_exts) ) {
			throw new TypeError("Option 'script_ext' must be an array that contains extension names!");
		}
		for(const t of script_exts) { 
			if ( typeof t !== "string" ) {
				throw new TypeError("Option 'script_ext' must be an array that contains extension names!");
			}
		 }
		



		__Updator.set(updator, {
			handler:options.update_handler,
			source_dir:options.source_dir,
			script_exts
		});

		return updator;
	}

	constructor() { super(); }
	async update(start_version?:string):Promise<void> {
		const {script_exts:SCRIPT_EXTS, source_dir, handler:UPDATE_HANDLER} = __Updator.get(this)!;
		const UPDATE_ROOT_DIR = path.resolve(process.cwd(), source_dir);

		
		// #region [ Prepare initial version info ]
		// Reads system's current version via handler
		let curr_sys_version:string = '0.0.0';
		{
			const cur_ver = await UPDATE_HANDLER.get_version();
			const version = cur_ver === null ? '0.0.0' : cur_ver;
			if ( Version.from(version, false) === null ) {
				throw new RangeError("Fetched version info is not a valid version string!");
			}
			curr_sys_version = version;
		}



		const is_forced = start_version !== undefined;
		let raw_version:string;
		if ( !is_forced ) {
			raw_version = curr_sys_version;
		}
		else {
			raw_version = start_version;
			if ( Version.from(raw_version, false) === null ) {
				throw new RangeError("Given start version is not a valid version string!");
			}
		}
		// #endregion
		
		const system_version = Version.from(raw_version);
		
		
		
		// Locate patch directory and filter out patch scripts
		const patch_versions:{version:Version, items:PatchItem[]}[] = [];
		{
			const dir_contents = await fsp.readdir(UPDATE_ROOT_DIR).catch(_=>false);
			if ( !Array.isArray(dir_contents) ) {
				throw new Error("Unable to locate update dir!");
			}
			
			const version_map:{[version:string]:PatchItem[]} = {};
			for(const fname of dir_contents) {
				let version:Version, type:string, order:number;
				
				
				// Detect file name and extension
				{
					let pos = fname.lastIndexOf('.');
					if ( pos < 0 ) continue;
					
					let v = Version.from(fname.substring(0, pos).trim(), false);
					if ( v === null ) continue;
					version = v;
					
					type = fname.substring(pos+1).trim().toLowerCase();
					order = SCRIPT_EXTS.indexOf(type);
					if ( order < 0 ) continue;
				}


				
				

				
				const ver_str = version.version_string;
				let items:PatchItem[] = version_map[ver_str];
				if ( !Array.isArray(items) ) {
					items = version_map[ver_str] = [];
					patch_versions.push({
						version:Version.from(version),
						items
					});
				}
				
				items.push({path:`${UPDATE_ROOT_DIR}/${fname}`, name:fname, version, type, order});
			}
			
			patch_versions.sort((a,b)=>a.version.compare(b.version));
		}

		
		
		
		// Look for start versions ( manual version is forced to be accepted )
		let BASE_VERSION = system_version;
		if ( is_forced ) {
			BASE_VERSION = Version.from("0.0.0");
			for(const {version} of patch_versions) {
				if ( version.compare(system_version) >= 0 ) break;
				BASE_VERSION = version;
			}
		}
		
		
		
		// Run patches
		this.emit('update-begin', 'update-begin', curr_sys_version);
		
		let prev_version:Version|null = null;
		for(const {version, items} of patch_versions) {
			if ( version.compare(BASE_VERSION) <= 0 ) continue;
			
			const prev_ver_str:string|null = prev_version === null ? null : prev_version.version_string
			this.emit('updating', 'updating', version.version_string, prev_ver_str);
			const patch_items = items.sort((a, b)=>a.order>b.order?1:(a.order<b.order?-1:0));
			for(const {path:script_path, name:script_name, type} of patch_items) {
				const file_info = {path:script_path, name:script_name};
				await UPDATE_HANDLER.handle_update(type, file_info, prev_ver_str);
				this.emit('update-script', 'update-script', file_info);
			}
			this.emit('updated', 'updated', version.version_string, prev_ver_str);	
			
			prev_version = version;
			await UPDATE_HANDLER.set_version(curr_sys_version = version.version_string);
		}

		this.emit('update-end', 'update-end', curr_sys_version);
	}


	on(event:'update-begin', handler:_update_start_handler):this;
	on(event:'update-end', handler:_update_end_handler):this;
	on(event:'update-script', handler:_update_script_handler):this;
	on(event:'updating', handler:_updating_handler):this;
	on(event:'updated', handler:_updated_handler):this;
	on(event:string, handler:update_handlers):this {
		return super.on(event, handler);
	}
}


export {Version, Updator, InitOptions, UpdateHandler};