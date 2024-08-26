const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.' // argumentos en la posición dos, si es null o undifined '.'
async function ls (folder) {
  let files

  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.error(`No se pudo leer : ${folder}`)
    process.exit(1) // sale de manera controlada
  }
  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file) // normaliza la ruta
    //  console.log('filePath = ', filePath);
    let stats

    try {
      stats = await fs.stat(filePath)
    } catch (error) {
      console.error(`Error en el ${filePath}`)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString()
    const lastModified = stats.mtime.toLocaleString()

    return ` ${pc.magenta(fileType)}  ${pc.green(
      file.padEnd(25)
    )}  ${fileSize.padEnd(5)}  ${lastModified} `
  })
  const fileInfo = await Promise.all(filesPromises)
  fileInfo.forEach((file) => {
    console.log(file)
  })
}
ls(folder)
