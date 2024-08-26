// controlar los eventos del proceso
console.log(process.env.PEPITO)

process.on('exit', () => {
  console.log('saliendo....')
})

// devuelve un array con los argumentos.. donde ejecuta, la carpeta del archivo, los argumentos
console.log(process.argv)

// finalizar el proceso
// process.exit(0);

// current working directory
console.log(process.cwd())
