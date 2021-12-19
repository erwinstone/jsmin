#!/usr/bin/env node

import { jsmin } from './main.js'

void (async () => {
	const path = process.argv[2]
	const watch = process.argv[3] === '--watch'
	await jsmin({ path, watch })
})()
