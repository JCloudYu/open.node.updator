"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updator = exports.Version = void 0;
/**
 *	Author: JCloudYu
 *	Create: 2021/03/25
**/
var stream_1 = require("stream");
var fsp = require("fs/promises");
var Version = require("./version.js");
exports.Version = Version;
var path = require("path");
var DEFAULT_SCRIPT_EXTS = ['sql', 'js'];
var __Updator = new WeakMap();
var Updator = /** @class */ (function (_super) {
    __extends(Updator, _super);
    function Updator() {
        return _super.call(this) || this;
    }
    Updator.init = function (options) {
        var updator = new Updator();
        var update_handler = options.update_handler;
        if (Object(update_handler) !== update_handler) {
            throw new TypeError("Option 'update_handler' is invalid!");
        }
        if (typeof update_handler.get_version !== "function" ||
            typeof update_handler.set_version !== "function" ||
            typeof update_handler.handle_update !== "function") {
            throw new TypeError("Option 'update_handler' is invalid!");
        }
        var script_exts = options.script_exts || DEFAULT_SCRIPT_EXTS;
        if (!Array.isArray(script_exts)) {
            throw new TypeError("Option 'script_ext' must be an array that contains extension names!");
        }
        for (var _i = 0, script_exts_1 = script_exts; _i < script_exts_1.length; _i++) {
            var t = script_exts_1[_i];
            if (typeof t !== "string") {
                throw new TypeError("Option 'script_ext' must be an array that contains extension names!");
            }
        }
        __Updator.set(updator, {
            handler: options.update_handler,
            source_dir: options.source_dir,
            script_exts: script_exts
        });
        return updator;
    };
    Updator.prototype.update = function (start_version) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, SCRIPT_EXTS, source_dir, UPDATE_HANDLER, UPDATE_ROOT_DIR, curr_sys_version, cur_ver, version, is_forced, raw_version, system_version, patch_versions, dir_contents, version_map, _i, dir_contents_1, fname, version, type, order, pos, v, ver_str, items, BASE_VERSION, _b, patch_versions_1, version, prev_version, _c, patch_versions_2, _d, version, items, prev_ver_str, patch_items, _e, patch_items_1, _f, script_path, script_name, type, file_info;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = __Updator.get(this), SCRIPT_EXTS = _a.script_exts, source_dir = _a.source_dir, UPDATE_HANDLER = _a.handler;
                        UPDATE_ROOT_DIR = path.resolve(process.cwd(), source_dir);
                        curr_sys_version = '0.0.0';
                        return [4 /*yield*/, UPDATE_HANDLER.get_version()];
                    case 1:
                        cur_ver = _g.sent();
                        version = cur_ver === null ? '0.0.0' : cur_ver;
                        if (Version.from(version, false) === null) {
                            throw new RangeError("Fetched version info is not a valid version string!");
                        }
                        curr_sys_version = version;
                        is_forced = start_version !== undefined;
                        if (!is_forced) {
                            raw_version = curr_sys_version;
                        }
                        else {
                            raw_version = start_version;
                            if (Version.from(raw_version, false) === null) {
                                throw new RangeError("Given start version is not a valid version string!");
                            }
                        }
                        system_version = Version.from(raw_version);
                        patch_versions = [];
                        return [4 /*yield*/, fsp.readdir(UPDATE_ROOT_DIR).catch(function (_) { return false; })];
                    case 2:
                        dir_contents = _g.sent();
                        if (!Array.isArray(dir_contents)) {
                            throw new Error("Unable to locate update dir!");
                        }
                        version_map = {};
                        for (_i = 0, dir_contents_1 = dir_contents; _i < dir_contents_1.length; _i++) {
                            fname = dir_contents_1[_i];
                            version = void 0, type = void 0, order = void 0;
                            // Detect file name and extension
                            {
                                pos = fname.lastIndexOf('.');
                                if (pos < 0)
                                    continue;
                                v = Version.from(fname.substring(0, pos).trim(), false);
                                if (v === null)
                                    continue;
                                version = v;
                                type = fname.substring(pos + 1).trim().toLowerCase();
                                order = SCRIPT_EXTS.indexOf(type);
                                if (order < 0)
                                    continue;
                            }
                            ver_str = version.version_string;
                            items = version_map[ver_str];
                            if (!Array.isArray(items)) {
                                items = version_map[ver_str] = [];
                                patch_versions.push({
                                    version: Version.from(version),
                                    items: items
                                });
                            }
                            items.push({ path: "".concat(UPDATE_ROOT_DIR, "/").concat(fname), name: fname, version: version, type: type, order: order });
                        }
                        patch_versions.sort(function (a, b) { return a.version.compare(b.version); });
                        BASE_VERSION = system_version;
                        if (is_forced) {
                            BASE_VERSION = Version.from("0.0.0");
                            for (_b = 0, patch_versions_1 = patch_versions; _b < patch_versions_1.length; _b++) {
                                version = patch_versions_1[_b].version;
                                if (version.compare(system_version) >= 0)
                                    break;
                                BASE_VERSION = version;
                            }
                        }
                        // Run patches
                        this.emit('update-begin', 'update-begin', curr_sys_version);
                        prev_version = null;
                        _c = 0, patch_versions_2 = patch_versions;
                        _g.label = 3;
                    case 3:
                        if (!(_c < patch_versions_2.length)) return [3 /*break*/, 10];
                        _d = patch_versions_2[_c], version = _d.version, items = _d.items;
                        if (version.compare(BASE_VERSION) <= 0)
                            return [3 /*break*/, 9];
                        prev_ver_str = prev_version === null ? null : prev_version.version_string;
                        this.emit('updating', 'updating', version.version_string, prev_ver_str);
                        patch_items = items.sort(function (a, b) { return a.order > b.order ? 1 : (a.order < b.order ? -1 : 0); });
                        _e = 0, patch_items_1 = patch_items;
                        _g.label = 4;
                    case 4:
                        if (!(_e < patch_items_1.length)) return [3 /*break*/, 7];
                        _f = patch_items_1[_e], script_path = _f.path, script_name = _f.name, type = _f.type;
                        file_info = { path: script_path, name: script_name };
                        return [4 /*yield*/, UPDATE_HANDLER.handle_update(type, file_info, prev_ver_str)];
                    case 5:
                        _g.sent();
                        this.emit('update-script', 'update-script', file_info);
                        _g.label = 6;
                    case 6:
                        _e++;
                        return [3 /*break*/, 4];
                    case 7:
                        this.emit('updated', 'updated', version.version_string, prev_ver_str);
                        prev_version = version;
                        return [4 /*yield*/, UPDATE_HANDLER.set_version(curr_sys_version = version.version_string)];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9:
                        _c++;
                        return [3 /*break*/, 3];
                    case 10:
                        this.emit('update-end', 'update-end', curr_sys_version);
                        return [2 /*return*/];
                }
            });
        });
    };
    Updator.prototype.on = function (event, handler) {
        return _super.prototype.on.call(this, event, handler);
    };
    return Updator;
}(stream_1.EventEmitter));
exports.Updator = Updator;
