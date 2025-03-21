import test from 'node:test'
import assert from 'node:assert'
import { readFileSync } from 'fs'
import { csvToTable, data } from './solution.js'

test('should return equal resul', (t) => {
  const expected = readFileSync('./result.txt', 'utf8')
  const result = csvToTable(data)

  assert.strictEqual(expected, result)
})
