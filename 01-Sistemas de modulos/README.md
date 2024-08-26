

# 01-Sistemas de Módulos

## CommonJS

- **CommonJS**: Sistema de módulos original de Node.js, utilizando `require`. Es el primer sistema de módulos de Node.js, pero actualmente está en desuso.

## ES Modules (`.mjs`)

- **MJS**: El sistema oficial de módulos de Node.js basado en ECMAScript. Utiliza `import` y `export` para importar y exportar módulos.

---

# 03-Native Modules

Node.js proporciona una biblioteca de módulos nativos que nos ofrece acceso a una amplia gama de funcionalidades (sistema de archivos, internet, sistema operativo, etc.).

## Importar Módulos Nativos

- **Usando `require`**:
  ```javascript
  const a = require('node:MODULO_AQUI'); // Funciona con autocompletado
  ```

- **Usando ECMAScript**:
  ```javascript
  import { } from 'node:MODULO_AQUI'; // Funciona con autocompletado
  ```

---

# 3-File-System-RF

## Sincronización y Asincronía

### Sincronización: `3-file-system-rf-sync`

- **Sync**: Ejecuta el código secuencialmente. Como se puede observar en `3-file-system-rf-sync`, las operaciones se realizan una tras otra, bloqueando la ejecución del código hasta que cada operación termina.

### Asincronía: `3-file-system-rf-async`

- **Async**: El orden de ejecución no está garantizado, ya que el callback se ejecutará cuando termine la tarea asíncrona. De este modo, podemos asegurar que el resto del código se ejecuta mientras se esperan las tareas asíncronas.

---

# Promesas

## Promesas: `4-file-system-rf-promises`

- Node.js incluye un módulo para trabajar con promesas, evitando el uso de callbacks. Esto permite manejar operaciones asíncronas de manera más sencilla y clara.

## Promisify: `4-file-system-rf-promisify`

- **Promisify**: Node.js implementa el módulo `node:util` que incluye la utilidad `promisify`. Esta utilidad convierte funciones que usan callbacks en funciones que retornan promesas, facilitando su manejo en código moderno.

# Async await: `5-file-system-rf-async-await`

Es una sintaxis moderna para trabajar con código asincrónico en JavaScript. Hace que el código asincrónico se vea y se comporte como código sincrónico, mientras sigue siendo no bloqueante.

Pausa de ejecución con await: Cuando se utiliza await con una promesa, la ejecución de la función asincrónica se pausa hasta que la promesa se resuelva o rechace. Esto permite manejar operaciones asincrónicas de manera más clara y secuencial.


 
# Async await parallel `6-file-system-rf-async-await-parallel.mjs`

paraleliza las promesas, las lee y las resuelve y entonces sigue con la ejecución resuelta en este caso con // .then( ...)  //


### NPM  node package manager -> administrador de paquetes de node

NPM es un registro público de paquetes y dependencias que se pueden usar en nuestros proyectos.

NPM también es una linea de comandos que usamos para usar en la terminal.(existen alternativas (pnp , yarn ...))

# Inicializar un proyecto:
 npm init
  esto crea el package.json nombre del proyecto entryPoint comando de testing keywordrs
  {
  "name": "nodejs",
  "version": "1.0.0",
  "description": "Curso de nodejs ",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "node",
    "filesystem",
    "path",
    "npm"
  ],
  "author": "",
  "license": "ISC",
  # aquí las dependencias.
    "dependencies": {   
    "picocolors": "1.0.1" 
  }
}
## instalar dependencias
# npmjs.com para buscar las dependencias
npm install NOMBRE

Ejemplo:
en el archivo ls-avanced-complete.js se ha instalado la dependencia picocolor(para dar color y algo de formato al cpnsole.log)
se debe importar con require o con import. y en el package.json apararecera el apartado con la dependencia importada.
Además aparecerá la carpeta node_modules, la cual albergará el módulo picocolors.

## dependencias de producción 
# linten con standard
las dependencias de desarrollo no son de producción

npm install standard -D -> la D crea en el package.json devDependencies: