#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
import getSingNodes from './src/getSingNodes.js'
import parser from './src/parser.js'

const source = process.env.SUBSCRIBE || process.argv[2]
const target = process.argv[3] || 'sing-nodes.json'

console.log(`Parse from:\n  ${source}`)

const response = await fetch(source)

const rawData = await response.text()

const data = parser(rawData)
const singNodes = getSingNodes(data)

await writeFile(target, JSON.stringify(singNodes, null, 2))

console.log(`Save nodes to:\n  ${target}`)
