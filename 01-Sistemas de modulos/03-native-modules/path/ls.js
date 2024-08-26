const fs = require('node:fs')

fs.readdir('.', (err, files) => {
  if (err) {
    console.error('error: ', err.message)
    return
  }
  files.forEach((file) => {
    console.log(file)
  })
})
