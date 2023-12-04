// bin/db.js

const dirTree = require("directory-tree");
const fs = require('fs');
const fm = require('html-frontmatter');

const files = [];

dirTree('./public', {extensions:/.html$/}, (item, PATH, stats) => {
  let path = __dirname +'../../'+ PATH;
  let content = fm(fs.readFileSync(path, 'utf-8'));
  files.push(content);
});

const filesJson = JSON.stringify(files, null, 2);
const content = 'module.exports.pages = ' + filesJson;

//fs.rm('./src/data/db.js');
fs.writeFile('./src/data/db.js', content, (err) => {
  if(err) { 
    console.log(err); 
  } else {
    console.log('Done!');
  }
})