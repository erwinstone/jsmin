import { promises as fs } from 'fs'
import { posix as path } from 'path'
import { performance } from 'perf_hooks'
import { watch as chokidar } from 'chokidar'
import { transform, build } from 'esbuild'

const log = {
	starting: (taskName: string) => {
		console.log(`Starting '${taskName}'...`)
		return performance.now()
	},
	finished: (taskName: string, start: number) => {
		let diff = Math.round(performance.now() - start)
		let elapsed = diff >= 1000 ? `${(diff / 1000).toFixed(2)} s` : `${Math.round(diff)} ms`
		elapsed = elapsed.toString()
		console.log(`Finished '${taskName}' after ${elapsed}`)
	},
}

async function getFiles(dir: string, files?: string[]) {
	files = files || []
	const dirContent = await fs.readdir(dir)
	for (const file of dirContent) {
		const filePath = path.join(dir, file)
		if ((await fs.stat(filePath)).isDirectory()) {
			files = await getFiles(filePath, files)
		} else {
			files.push(filePath)
		}
	}
	return filter(files)
}

function filter(files: string[]) {
	return files.filter((file) => file.endsWith('.js') && !file.endsWith('.min.js'))
}

async function run(dataPath: jsminParams['path']) {
	const start = log.starting('jsmin')

	let files: string[] = []
	if ((await fs.stat(dataPath)).isDirectory()) {
		files = await getFiles(dataPath)
	} else {
		files.push(dataPath)
	}

	await Promise.all(
		files.map((file) => {
			build({
				entryPoints: [file],
				outfile: file.slice(0, -2) + 'min.js',
				minify: true,
			})
		})
	)
	log.finished('jsmin', start)
}

function watch(dataPath: jsminParams['path']) {
	chokidar(dataPath, { ignoreInitial: true })
		.on('all', (e, target) => setTimeout(async () => !target.endsWith('.min.js') && (await run(dataPath)), 200))
		.on('ready', () => console.log('Ready for changes'))
}

export async function jsmin(params: jsminParams) {
	if (params.watch === true) {
		watch(params.path)
	} else {
		await run(params.path)
	}
}

export async function jsminStr(script: string) {
	return (await transform(script, { minify: true })).code
}

interface jsminParams {
	path: string
	watch?: boolean
}
