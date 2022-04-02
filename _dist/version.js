"use strict";
var _a;
module.exports = (_a = /** @class */ (function () {
        function Version(v) {
            if (v === void 0) { v = '0.0.0'; }
            var MAX_NUMBER = Version.MAX_NUMBER, FULL_VERSION = Version.FULL_VERSION, PARTIAL_VERSION = Version.PARTIAL_VERSION;
            if (v instanceof Version) {
                this._major = v._major;
                this._minor = v._minor;
                this._patch = v._patch;
                return;
            }
            var version = '' + v;
            var matches;
            // Partial version matched
            matches = version.match(PARTIAL_VERSION);
            if (matches !== null) {
                var _major = matches[1], _minor = matches[3];
                var major = parseInt(_major);
                var minor = _minor === undefined ? null : parseInt(_minor);
                if (major > MAX_NUMBER || (minor !== null && minor > MAX_NUMBER)) {
                    throw new RangeError("Each of the version components must not be greater than ".concat(MAX_NUMBER, "!"));
                }
                this._major = major;
                this._minor = minor;
                this._patch = null;
                return;
            }
            // Full version matched
            matches = version.match(FULL_VERSION);
            if (matches !== null) {
                var _major = matches[1], _minor = matches[2], _patch = matches[3];
                var major = parseInt(_major);
                var minor = parseInt(_minor);
                var patch = parseInt(_patch);
                if (major > MAX_NUMBER || minor > MAX_NUMBER || patch > MAX_NUMBER) {
                    throw new RangeError("Each of the version components must not be greater than ".concat(MAX_NUMBER, "!"));
                }
                this._major = major;
                this._minor = minor;
                this._patch = patch;
                return;
            }
            throw new RangeError("Given init version ".concat(version, " is not a valid version string!"));
        }
        Version.prototype.compare = function (cmp_ver, _larger) {
            if (_larger === void 0) { _larger = true; }
            var ver = Version.from(cmp_ver);
            var missing_value = _larger ? Version.MAX_NUMBER : -1;
            var tests = ['_major', '_minor', '_patch'];
            for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
                var digit = tests_1[_i];
                var a = this[digit], b = ver[digit];
                a = (a === null) ? missing_value : a;
                b = (b === null) ? missing_value : b;
                if (a > b)
                    return 1;
                if (a < b)
                    return -1;
            }
            return 0;
        };
        Version.prototype.toString = function () { return this.version_string; };
        Object.defineProperty(Version.prototype, "version_string", {
            get: function () {
                var _a = this, _major = _a._major, _minor = _a._minor, _patch = _a._patch;
                return _major + (_minor === null ? '' : '.' + _minor) + (_patch === null ? '' : '.' + _patch);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "major", {
            get: function () { return this._major; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "minor", {
            get: function () { return this._minor; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "patch", {
            get: function () { return this._patch; },
            enumerable: false,
            configurable: true
        });
        Version.from = function (v, throw_error) {
            if (throw_error === void 0) { throw_error = true; }
            try {
                return (v instanceof Version) ? v : new Version(v);
            }
            catch (e) {
                if (throw_error)
                    throw e;
                return null;
            }
        };
        Version.compare = function (a, b, _larger) {
            if (_larger === void 0) { _larger = true; }
            a = Version.from(a);
            b = Version.from(b);
            return a.compare(b, _larger);
        };
        return Version;
    }()),
    _a.MAX_NUMBER = 999999999,
    _a.FULL_VERSION = /^([0-9]|[1-9][0-9]+)\.([0-9]|[1-9][0-9]+)\.([0-9]|[1-9][0-9]+)$/,
    _a.PARTIAL_VERSION = /^([0-9]|[1-9][0-9]+)(\.([0-9]|[1-9][0-9]+))?$/,
    _a);
