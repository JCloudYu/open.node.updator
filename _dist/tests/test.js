"use strict";
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
var updator_js_1 = require("../updator.js");
Promise.resolve().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ground_truth, traversed_1, curr_version_1, updator, ground_truth, traversed_2, curr_version_2, updator, ground_truth, traversed_3, curr_version_3, updator;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ground_truth = [
                    '0.0.1.js',
                    '0.0.1.sql',
                    '0.1.0.sql',
                    '0.1.1.js',
                    '0.1.2.js',
                    '0.1.2.sql',
                    '0.2.0.sql',
                    '0.2.1.js',
                    '0.2.1.sql',
                    '0.2.3.js'
                ];
                traversed_1 = [];
                curr_version_1 = null;
                updator = updator_js_1.Updator.init({
                    script_exts: ['js', 'sql'],
                    update_handler: {
                        handle_update: function (type, file, prev) { return new Promise(function (resolve) {
                            setTimeout(resolve, Math.random() * 100 + 100);
                        }); },
                        get_version: function () {
                            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, curr_version_1];
                            }); });
                        },
                        set_version: function (v) {
                            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                curr_version_1 = v;
                                return [2 /*return*/];
                            }); });
                        },
                    },
                    source_dir: "".concat(__dirname, "/../../tests/updates")
                });
                updator.on('update-script', function (event, script_info) { traversed_1.push(script_info.name); });
                return [4 /*yield*/, updator.update()];
            case 1:
                _a.sent();
                console.log("Update: Fresh", ground_truth.join(',') === traversed_1.join(',') ? "\u001b[32m✓\u001b[39m" : "\u001b[31m✗\u001b[39m");
                ground_truth = [
                    '0.1.2.js',
                    '0.1.2.sql',
                    '0.2.0.sql',
                    '0.2.1.js',
                    '0.2.1.sql',
                    '0.2.3.js'
                ];
                traversed_2 = [];
                curr_version_2 = '0.1.1';
                updator = updator_js_1.Updator.init({
                    script_exts: ['js', 'sql'],
                    update_handler: {
                        handle_update: function (type, file, prev) { return new Promise(function (resolve) {
                            setTimeout(resolve, Math.random() * 100 + 100);
                        }); },
                        get_version: function () {
                            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, curr_version_2];
                            }); });
                        },
                        set_version: function (v) {
                            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                curr_version_2 = v;
                                return [2 /*return*/];
                            }); });
                        },
                    },
                    source_dir: "".concat(__dirname, "/../../tests/updates")
                });
                updator.on('update-script', function (event, script_info) { traversed_2.push(script_info.name); });
                return [4 /*yield*/, updator.update()];
            case 2:
                _a.sent();
                console.log("Update: Default", ground_truth.join(',') === traversed_2.join(',') ? "\u001b[32m✓\u001b[39m" : "\u001b[31m✗\u001b[39m");
                ground_truth = [
                    '0.1.2.js',
                    '0.1.2.sql',
                    '0.2.0.sql',
                    '0.2.1.js',
                    '0.2.1.sql',
                    '0.2.3.js'
                ];
                traversed_3 = [];
                curr_version_3 = '0.0.1';
                updator = updator_js_1.Updator.init({
                    script_exts: ['js', 'sql'],
                    update_handler: {
                        handle_update: function (type, file, prev) { return new Promise(function (resolve) {
                            setTimeout(resolve, Math.random() * 100 + 100);
                        }); },
                        get_version: function () {
                            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, curr_version_3];
                            }); });
                        },
                        set_version: function (v) {
                            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                curr_version_3 = v;
                                return [2 /*return*/];
                            }); });
                        },
                    },
                    source_dir: "".concat(__dirname, "/../../tests/updates")
                });
                updator.on('update-script', function (event, script_info) { traversed_3.push(script_info.name); });
                return [4 /*yield*/, updator.update('0.1.2')];
            case 3:
                _a.sent();
                console.log("Update: Pick", ground_truth.join(',') === traversed_3.join(',') ? "\u001b[32m✓\u001b[39m" : "\u001b[31m✗\u001b[39m");
                return [2 /*return*/];
        }
    });
}); });
