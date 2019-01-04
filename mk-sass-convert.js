const fs = require('fs'),
  path = require('path'),
  sass = require('node-sass'),
  src = './src/',
  dist = './dist/',
  commander = require('commander')

const copyCSSToBK = fileName => copy(cssFolder + 'dev/' + fileName, cssFolder + 'bk/' + fileName)
const copyJSToBK = fileName => copy(jsFolder + 'dev/' + fileName, jsFolder + 'bk/' + fileName)
const copy = (from, to) => fs.copyFile(from, to, err => { if (err) throw err })

const sassAll = moduleName => {
  fs.readdir(src, (err, items) => {
    if (err) throw new Error(err)
    items.filter(mdl => (moduleName && mdl.includes(moduleName)) || (!moduleName && path.extname(mdl) === '.sass'))
      .map(sassConvert)
  })
}
const sassConvert = (fileName, i) => {
  sass.render({
    file: src + fileName,
  }, (err, result) => {
    if (err) throw err
    fs.writeFileSync(dist + 'css/anph-atomic.css', result.css);
  });
}


//---- CMD MINIFY ----//
commander
  .version('1.0.0', '-v, --version')
  .option('-o, --one [module]', 'sass convert one file', sassConvert)//chat [chat.css, modules.chat.js]
  .option('-a, --all', 'sass convert all js and css file', sassAll)
  .parse(process.argv)