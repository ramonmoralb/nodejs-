//módulo nativo 'os' proporciona info del sistema operativo

const os = require('node:os');

console.log('Información del sistema operativo');
console.log('--------------------------------');

console.log('Nombre del sistema operativo:', os.platform());
console.log('Versión', os.release());
console.log('CPUs', os.cpus());
console.log('Arquitectura', os.arch());
console.log('Memoria libre', os.freemem() / 1024 / 1024, 'mg');
console.log('Memoria total', os.totalmem() / 1024 / 1024, 'mg');
console.log('uptime', os.uptime() / 60 / 60 / 24, 'días encendido');
