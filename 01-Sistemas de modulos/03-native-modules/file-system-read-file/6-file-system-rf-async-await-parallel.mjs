import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./archivos/archivo.txt', 'utf-8'),
  readFile('./archivos/archivo2.txt', 'utf-8')
]).then(([a, b]) => {
  console.log('primer texto', a)
  console.log('segundo texto:', b)
})
