const path = require('node:path');

// separador según SO
console.log(path.sep);

//unir rutas
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log(filePath);

//nombre del acrchivo
const fileName = path.basename(filePath);
console.log(fileName);

//extensión
const ext = path.extname(filePath);
console.log(ext);
/**
 * 
content\subfolder\test.txt
test.txt
.txt
 */
