/* ejemplo de ls avanzado en el que se le pasa por argumento en la linea de comando la carpeta que se desea listar */

const fs = require('node:fs/promises')

const folder = process.argv[2] ?? '.'
/* en la posición 2 el array tiene el primer argumento pasado por línea de comandos
 * si es undefinned o null el ?? (Operador de coalescencia nula) devuelve el valor de la derecha '.'
 */

fs.readdir(folder)
  .then((files) => {
    files.forEach((file) => {
      console.log(file)
    })
  })
  .catch((err) => {
    console.error(err.message)
  })

/** process.argv;  process devuelve un array
 *
 * [0] donde se ejecuta el proceso
 * [1] path donde se aloja el archivo
 * [2] argumento
 * [3] argumento
 * [...]...
 *
 * ejemplo:
 *
 * // ejecutar esto en la línea de comandos entra el if node ls-advanced.js 7
    if (process.argv[2] === '7') {
        console.log(' es igual a 7');
    }

 */
