declare const _default: {
    new (v?: string | {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    }): {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    };
    readonly MAX_NUMBER: 999999999;
    readonly FULL_VERSION: RegExp;
    readonly PARTIAL_VERSION: RegExp;
    from(v: string | {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    }): {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    };
    from(v: string | {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    }, throw_error: true): {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    };
    from(v: string | {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    }, throw_error: false): {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    } | null;
    compare(a: string | {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    }, b: string | {
        _major: number | null;
        _minor: number | null;
        _patch: number | null;
        compare(cmp_ver: string | any, _larger?: boolean): -1 | 0 | 1;
        toString(): string;
        readonly version_string: string;
        readonly major: number | null;
        readonly minor: number | null;
        readonly patch: number | null;
    }, _larger?: boolean): -1 | 0 | 1;
};
export = _default;
