import {Updator} from "../updator.js";

Promise.resolve().then(async()=>{
	{
		const ground_truth:string[] = [
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

		const traversed:string[] = [];
		let curr_version:string|null = null;
		const updator = Updator.init({
			script_exts: ['js', 'sql'],
			update_handler: {
				handle_update: (type, file, prev)=>new Promise((resolve)=>{
					setTimeout(resolve, Math.random() * 100 + 100);
				}),
				get_version: async function() { return curr_version; },
				set_version: async function(v) { curr_version = v; },
			},
			source_dir: `${__dirname}/../../tests/updates`
		});
		updator.on('update-script', (event, script_info)=>{ traversed.push(script_info.name); });

		await updator.update();
		console.log("Update: Fresh", ground_truth.join(',') === traversed.join(',') ? "\u001b[32m✓\u001b[39m" : "\u001b[31m✗\u001b[39m");
	}

	{
		const ground_truth:string[] = [
			'0.1.2.js',
			'0.1.2.sql',
			'0.2.0.sql',
			'0.2.1.js',
			'0.2.1.sql',
			'0.2.3.js'
		];

		const traversed:string[] = [];
		let curr_version:string|null = '0.1.1';
		const updator = Updator.init({
			script_exts: ['js', 'sql'],
			update_handler: {
				handle_update: (type, file, prev)=>new Promise((resolve)=>{
					setTimeout(resolve, Math.random() * 100 + 100);
				}),
				get_version: async function() { return curr_version; },
				set_version: async function(v) { curr_version = v; },
			},
			source_dir: `${__dirname}/../../tests/updates`
		});
		updator.on('update-script', (event, script_info)=>{ traversed.push(script_info.name); });

		await updator.update();
		console.log("Update: Default", ground_truth.join(',') === traversed.join(',') ? "\u001b[32m✓\u001b[39m" : "\u001b[31m✗\u001b[39m");
	}

	{
		const ground_truth:string[] = [
			'0.1.2.js',
			'0.1.2.sql',
			'0.2.0.sql',
			'0.2.1.js',
			'0.2.1.sql',
			'0.2.3.js'
		];

		const traversed:string[] = [];
		let curr_version:string|null = '0.0.1';
		const updator = Updator.init({
			script_exts: ['js', 'sql'],
			update_handler: {
				handle_update: (type, file, prev)=>new Promise((resolve)=>{
					setTimeout(resolve, Math.random() * 100 + 100);
				}),
				get_version: async function() { return curr_version; },
				set_version: async function(v) { curr_version = v; },
			},
			source_dir: `${__dirname}/../../tests/updates`
		});
		updator.on('update-script', (event, script_info)=>{ traversed.push(script_info.name); });

		await updator.update('0.1.2');
		console.log("Update: Pick", ground_truth.join(',') === traversed.join(',') ? "\u001b[32m✓\u001b[39m" : "\u001b[31m✗\u001b[39m");
	}
});