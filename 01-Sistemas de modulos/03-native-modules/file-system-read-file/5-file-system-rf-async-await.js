const { readFile } = require('node:fs/promises');
// commonjs no funciona async await, es necesario envolverlo de la siguiente manera
//asincrono de manera secuencial
// -- IIFE inmediatly invoked function expression -> función anonima que mientrás la creamos se ejecuta automáticamente
(async () => {
  console.log('leyendo archivo 1........');
  const firstText = await readFile('./archivos/archivo.txt', 'utf-8'); // await pausa la ejecución mientras resuelve la promesa
  console.log(firstText);

  console.log('Hacer cosas aquí...');

  console.log('leyendo archivo 2........');
  const secondText = await readFile('./archivos/archivo2.txt', 'utf-8'); // await pausa la ejecución mientras resuelve la promesa
  console.log(secondText);
})();

/**otra manera hacer la función y ejecutarla
 
async  function init() {
  console.log('Ejeccutando funcion init');
  console.log('leyendo archivo 1........');
  const firstText = await readFile('./archivos/archivo.txt', 'utf-8'); // await pausa la ejecución mientras resuelve la promesa
  console.log(firstText);

  console.log('Hacer cosas aquí...');

  console.log('leyendo archivo 2........');
  const secondText = await readFile('./archivos/archivo2.txt', 'utf-8'); // await pausa la ejecución mientras resuelve la promesa
  console.log(secondText);
}
init();
 */
