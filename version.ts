export = class Version {
	static readonly MAX_NUMBER = 999999999;
	static readonly FULL_VERSION = /^([0-9]|[1-9][0-9]+)\.([0-9]|[1-9][0-9]+)\.([0-9]|[1-9][0-9]+)$/;
	static readonly PARTIAL_VERSION = /^([0-9]|[1-9][0-9]+)(\.([0-9]|[1-9][0-9]+))?$/;
	

	_major:number|null;
	_minor:number|null;
	_patch:number|null;
	
	constructor(v:string|Version='0.0.0') {
		const {MAX_NUMBER, FULL_VERSION, PARTIAL_VERSION} = Version;
		if ( v instanceof Version ) {
			this._major = v._major;
			this._minor = v._minor;
			this._patch = v._patch;
			return;
		}

		const version = '' + v;



		let matches:null|string[];
		
		// Partial version matched
		matches = version.match(PARTIAL_VERSION);
		if ( matches !== null ) {
			let [, _major,, _minor] = matches;
			
			let major = parseInt(_major);
			let minor = _minor === undefined ? null : parseInt(_minor);
			if ( major > MAX_NUMBER || (minor !== null && minor > MAX_NUMBER) ) {
				throw new RangeError(`Each of the version components must not be greater than ${MAX_NUMBER}!`);
			}
			
			this._major = major;
			this._minor = minor;
			this._patch = null;
			return;
		}

		// Full version matched
		matches = version.match(FULL_VERSION);
		if ( matches !== null ) {
			let [, _major, _minor, _patch] = matches;
			let major = parseInt(_major);
			let minor = parseInt(_minor);
			let patch = parseInt(_patch);
			
			if ( major > MAX_NUMBER || minor > MAX_NUMBER || patch > MAX_NUMBER ) {
				throw new RangeError(`Each of the version components must not be greater than ${MAX_NUMBER}!`);
			}
		
			this._major = major;
			this._minor = minor;
			this._patch = patch;
			return;
		}

		throw new RangeError(`Given init version ${version} is not a valid version string!`);
	}
	compare(cmp_ver:string|Version, _larger:boolean=true):-1|0|1 {
		let ver = Version.from(cmp_ver);
		

		const missing_value = _larger ? Version.MAX_NUMBER : -1;
		const tests:(keyof Version)[] = ['_major', '_minor', '_patch'];
		for(const digit of tests) {
			let a = this[digit], b = ver[digit];
			
			a = (a===null)?missing_value:a;
			b = (b===null)?missing_value:b;
			
			if ( a > b ) return 1;
			if ( a < b ) return -1;
		}
		
		return 0;
	}
	
	toString() { return this.version_string; }
	get version_string() {
		const {_major, _minor, _patch} = this;
		return _major + (_minor===null?'':'.'+_minor) + (_patch===null?'':'.'+_patch);
	}
	get major() { return this._major; }
	get minor() { return this._minor; }
	get patch() { return this._patch; }
	


	
	static from(v:string|Version):Version;
	static from(v:string|Version, throw_error:true):Version;
	static from(v:string|Version, throw_error:false):Version|null;
	static from(v:string|Version, throw_error:boolean=true) {
		try {
			return (v instanceof Version) ? v : new Version(v);
		}
		catch(e) {
			if ( throw_error ) throw e;
			return null;
		}
	}

	static compare(a:string|Version, b:string|Version, _larger:boolean=true):-1|0|1 {
		a = Version.from(a);
		b = Version.from(b);
		return a.compare(b, _larger);
	}
};