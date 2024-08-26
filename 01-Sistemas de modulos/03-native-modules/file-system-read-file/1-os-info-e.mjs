//usando impor ecmascript

import {
  platform,
  release,
  cpus,
  arch,
  freemem,
  totalmem,
  uptime,
} from 'node:os';

console.log('Información del sistema operativo');
console.log('--------------------------------');

console.log('Nombre del sistema operativo:', platform());
console.log('Versión', release());
console.log('CPUs', cpus());
console.log('Arquitectura', arch());
console.log('Memoria libre', freemem() / 1024 / 1024, 'mg');
console.log('Memoria total', totalmem() / 1024 / 1024, 'mg');
console.log('uptime', uptime() / 60 / 60 / 24, 'días encendido');
